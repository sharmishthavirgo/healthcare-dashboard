import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Patient } from '../../../types/patient';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { MOCK_PATIENTS } from '../../../mockData/patient'; // For fetching mock data by ID
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// --- Zod Schema for Validation ---
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format (e.g., 12345 or 12345-6789)'),
  country: z.string().min(1, 'Country is required'),
});

const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format (10 digits)'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
});

const medicationSchema = z.object({
  id: z.string().optional(), // ID is optional for new medications before saving
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  prescribedBy: z.string().min(1, 'Prescriber is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean(),
});

const insuranceInfoSchema = z.object({
  provider: z.string().min(1, 'Insurance provider is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  groupNumber: z.string().optional().or(z.literal('')),
  effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  copay: z.number().min(0, 'Copay must be non-negative'),
  deductible: z.number().min(0, 'Deductible must be non-negative'),
});

const documentSchema = z.object({
  id: z.string().optional(), // ID is optional for new documents before upload
  type: z.enum(['medical_record', 'insurance_card', 'photo_id', 'test_result', 'other']),
  name: z.string().min(1, 'Document name is required'),
  uploadDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  fileSize: z.number().min(0, 'File size must be non-negative'),
  mimeType: z.string().min(1, 'Mime type is required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')), // URL might be temporary or empty before upload
});

// Main Patient Schema (for form data)
const patientFormSchema = z.object({
  id: z.string().optional(), // Optional for new patients
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth is required (YYYY-MM-DD)'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format (10 digits)'),
  address: addressSchema,
  emergencyContact: emergencyContactSchema,
  medicalInfo: z.object({
    allergies: z.array(z.string()).optional(),
    currentMedications: z.array(medicationSchema).optional(),
    conditions: z.array(z.string()).optional(),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      message: 'Invalid blood type',
    }),
    lastVisit: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Last Visit date is required (YYYY-MM-DD)'),
    status: z.enum(['active', 'inactive', 'critical'], { message: 'Invalid status' }),
  }),
  insurance: insuranceInfoSchema,
  documents: z.array(documentSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  patientId?: string; // Prop for editing existing patient
}

const PatientForm: React.FC<PatientFormProps> = ({ patientId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch patient data if in edit mode
  const { data: existingPatient, isLoading: isPatientLoading } = useQuery<
    Patient | undefined,
    Error
  >({
    queryKey: ['patient', patientId],
    queryFn: async () => {
      if (!patientId) return undefined;
      // Simulate API call to fetch single patient
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_PATIENTS.find((p) => p.id === patientId);
    },
    enabled: !!patientId, // Only run query if patientId exists
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      address: { street: '', city: '', state: '', zipCode: '', country: '' },
      emergencyContact: { name: '', relationship: '', phone: '', email: '' },
      medicalInfo: {
        allergies: [],
        currentMedications: [],
        conditions: [],
        bloodType: 'O+', // Default
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'active', // Default
      },
      insurance: {
        provider: '',
        policyNumber: '',
        effectiveDate: new Date().toISOString().split('T')[0],
        copay: 0,
        deductible: 0,
      },
      documents: [],
    },
  });

  useEffect(() => {
    if (existingPatient) {
      reset({
        ...existingPatient,
        medicalInfo: {
          ...existingPatient.medicalInfo,
          allergies: existingPatient.medicalInfo.allergies || [],
          currentMedications: existingPatient.medicalInfo.currentMedications || [],
          conditions: existingPatient.medicalInfo.conditions || [],
        },
        documents: existingPatient.documents
          ? existingPatient.documents.map((doc) => ({
              ...doc,
              type: [
                'medical_record',
                'insurance_card',
                'photo_id',
                'test_result',
                'other',
              ].includes(doc.type)
                ? (doc.type as
                    | 'medical_record'
                    | 'insurance_card'
                    | 'photo_id'
                    | 'test_result'
                    | 'other')
                : 'other',
            }))
          : [],
        insurance: {
          ...existingPatient.insurance,
          copay: existingPatient.insurance.copay, // keep as number for schema validation
          deductible: existingPatient.insurance.deductible, // keep as number for schema validation
        },
      });
    }
  }, [existingPatient, reset]);

  // Field Array for dynamic fields (Medications, Documents)
  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: 'medicalInfo.currentMedications',
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: 'documents',
  });

  // Mutation for saving patient data (create/update)
  const savePatientMutation = useMutation<
    { message: string; id: string },
    Error,
    PatientFormData
  >({
    mutationFn: async (patientData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Saving patient:', patientData);
      // In a real app, send to backend API
      // if (patientId) {
      //   return apiClient.put(`/patients/${patientId}`, patientData); // Update
      // } else {
      //   return apiClient.post('/patients', patientData); // Create
      // }
      return { message: 'Patient saved successfully!', id: patientId || 'new_temp_id' };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] }); // Invalidate patient list
      queryClient.invalidateQueries({ queryKey: ['patient', patientId] }); // Invalidate specific patient if updated
      alert(`Patient ${patientId ? 'updated' : 'created'} successfully!`);
      if (!patientId) {
        // For new patients, redirect to their new detail page or patient list
        navigate(`/patients/${data.id || 'new_patient_id_from_backend'}`);
      } else {
        navigate(`/patients/${patientId}`);
      }
    },
    onError: (error) => {
      alert(`Error saving patient: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<PatientFormData> = async (data) => {
    // Convert allergies and conditions string to array if comma-separated
    const formattedData = {
      ...data,
      medicalInfo: {
        ...data.medicalInfo,
        allergies: data.medicalInfo.allergies?.map((s) => s.trim()).filter(Boolean) || [],
        conditions: data.medicalInfo.conditions?.map((s) => s.trim()).filter(Boolean) || [],
      },
    };
    savePatientMutation.mutate(formattedData);
  };

  if (patientId && isPatientLoading) {
    return <CircularProgress />;
  }

  // Auto-save draft (Stretch Goal - conceptual)
  // You would typically debounce this and save to local storage or a backend draft service

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const documentTypes = ['medical_record', 'insurance_card', 'photo_id', 'test_result', 'other'];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Personal Information */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid>
              <TextField
                label="First Name"
                {...register('firstName')}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Last Name"
                {...register('lastName')}
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Date of Birth (YYYY-MM-DD)"
                {...register('dateOfBirth')}
                fullWidth
                type="date" // Use date picker type
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Email"
                {...register('email')}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Phone"
                {...register('phone')}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>

          {/* Address */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Address
          </Typography>
          <Grid container spacing={3}>
            <Grid>
              <TextField
                label="Street"
                {...register('address.street')}
                fullWidth
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="City"
                {...register('address.city')}
                fullWidth
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="State"
                {...register('address.state')}
                fullWidth
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="ZIP Code"
                {...register('address.zipCode')}
                fullWidth
                error={!!errors.address?.zipCode}
                helperText={errors.address?.zipCode?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Country"
                {...register('address.country')}
                fullWidth
                error={!!errors.address?.country}
                helperText={errors.address?.country?.message}
              />
            </Grid>
          </Grid>

          {/* Emergency Contact */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Emergency Contact
          </Typography>
          <Grid container spacing={3}>
            <Grid>
              <TextField
                label="Name"
                {...register('emergencyContact.name')}
                fullWidth
                error={!!errors.emergencyContact?.name}
                helperText={errors.emergencyContact?.name?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Relationship"
                {...register('emergencyContact.relationship')}
                fullWidth
                error={!!errors.emergencyContact?.relationship}
                helperText={errors.emergencyContact?.relationship?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Phone"
                {...register('emergencyContact.phone')}
                fullWidth
                error={!!errors.emergencyContact?.phone}
                helperText={errors.emergencyContact?.phone?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Email (Optional)"
                {...register('emergencyContact.email')}
                fullWidth
                error={!!errors.emergencyContact?.email}
                helperText={errors.emergencyContact?.email?.message}
              />
            </Grid>
          </Grid>

          {/* Medical Information */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Medical Information
          </Typography>
          <Grid container spacing={3}>
            <Grid>
              <TextField
                label="Allergies (comma-separated)"
                {...register('medicalInfo.allergies', {
                  setValueAs: (value: string) =>
                    value.length > 0
                      ? value.includes(',')
                        ? value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        : [value]
                      : [],
                })}
                fullWidth
                defaultValue={existingPatient?.medicalInfo.allergies?.join(', ')}
                error={!!errors.medicalInfo?.allergies}
                helperText={errors.medicalInfo?.allergies?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Conditions (comma-separated)"
                {...register('medicalInfo.conditions', {
                  setValueAs: (value: string) =>
                    value.length > 0
                      ? value.includes(',')
                        ? value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        : [value]
                      : [],
                })}
                fullWidth
                defaultValue={existingPatient?.medicalInfo.conditions?.join(', ')}
                error={!!errors.medicalInfo?.conditions}
                helperText={errors.medicalInfo?.conditions?.message}
              />
            </Grid>
            <Grid>
              <TextField
                select
                label="Blood Type"
                {...register('medicalInfo.bloodType')}
                fullWidth
                error={!!errors.medicalInfo?.bloodType}
                helperText={errors.medicalInfo?.bloodType?.message}
              >
                {bloodTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                label="Last Visit Date (YYYY-MM-DD)"
                {...register('medicalInfo.lastVisit')}
                fullWidth
                type="date"
                error={!!errors.medicalInfo?.lastVisit}
                helperText={errors.medicalInfo?.lastVisit?.message}
              />
            </Grid>
            <Grid>
              <TextField
                select
                label="Status"
                {...register('medicalInfo.status')}
                fullWidth
                error={!!errors.medicalInfo?.status}
                helperText={errors.medicalInfo?.status?.message}
              >
                {['active', 'inactive', 'critical'].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Current Medications (Dynamic List) */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Current Medications
          </Typography>
          {medicationFields.map((field, index) => (
            <Paper key={field.id} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <TextField
                    label="Medication Name"
                    {...register(`medicalInfo.currentMedications.${index}.name`)}
                    fullWidth
                    error={!!errors.medicalInfo?.currentMedications?.[index]?.name}
                    helperText={errors.medicalInfo?.currentMedications?.[index]?.name?.message}
                    sx={{ mb: 1 }}
                  />
                  <Grid container spacing={2}>
                    <Grid>
                      <TextField
                        label="Dosage"
                        {...register(`medicalInfo.currentMedications.${index}.dosage`)}
                        fullWidth
                        error={!!errors.medicalInfo?.currentMedications?.[index]?.dosage}
                        helperText={
                          errors.medicalInfo?.currentMedications?.[index]?.dosage?.message
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        label="Frequency"
                        {...register(`medicalInfo.currentMedications.${index}.frequency`)}
                        fullWidth
                        error={!!errors.medicalInfo?.currentMedications?.[index]?.frequency}
                        helperText={
                          errors.medicalInfo?.currentMedications?.[index]?.frequency?.message
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        label="Prescribed By"
                        {...register(`medicalInfo.currentMedications.${index}.prescribedBy`)}
                        fullWidth
                        error={!!errors.medicalInfo?.currentMedications?.[index]?.prescribedBy}
                        helperText={
                          errors.medicalInfo?.currentMedications?.[index]?.prescribedBy?.message
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        label="Start Date (YYYY-MM-DD)"
                        {...register(`medicalInfo.currentMedications.${index}.startDate`)}
                        fullWidth
                        type="date"
                        error={!!errors.medicalInfo?.currentMedications?.[index]?.startDate}
                        helperText={
                          errors.medicalInfo?.currentMedications?.[index]?.startDate?.message
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        label="End Date (Optional YYYY-MM-DD)"
                        {...register(`medicalInfo.currentMedications.${index}.endDate`)}
                        fullWidth
                        type="date"
                        error={!!errors.medicalInfo?.currentMedications?.[index]?.endDate}
                        helperText={
                          errors.medicalInfo?.currentMedications?.[index]?.endDate?.message
                        }
                      />
                    </Grid>
                    <Grid>
                      <Controller
                        name={`medicalInfo.currentMedications.${index}.isActive`}
                        control={control}
                        render={({ field }) => (
                          <label>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={e => field.onChange(e.target.checked)}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />{' '}
                            Active
                          </label>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Tooltip title="Remove Medication">
                    <IconButton onClick={() => removeMedication(index)} color="error">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              appendMedication({
                id: '', // Will be generated by backend or on save
                name: '',
                dosage: '',
                frequency: '',
                prescribedBy: '',
                startDate: new Date().toISOString().split('T')[0],
                isActive: true,
              })
            }
            variant="outlined"
            sx={{ mb: 4 }}
          >
            Add Medication
          </Button>

          {/* Insurance Information */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Insurance Information
          </Typography>
          <Grid container spacing={3}>
            <Grid>
              <TextField
                label="Provider"
                {...register('insurance.provider')}
                fullWidth
                error={!!errors.insurance?.provider}
                helperText={errors.insurance?.provider?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Policy Number"
                {...register('insurance.policyNumber')}
                fullWidth
                error={!!errors.insurance?.policyNumber}
                helperText={errors.insurance?.policyNumber?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Group Number (Optional)"
                {...register('insurance.groupNumber')}
                fullWidth
                error={!!errors.insurance?.groupNumber}
                helperText={errors.insurance?.groupNumber?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Effective Date (YYYY-MM-DD)"
                {...register('insurance.effectiveDate')}
                fullWidth
                type="date"
                error={!!errors.insurance?.effectiveDate}
                helperText={errors.insurance?.effectiveDate?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Expiration Date (Optional YYYY-MM-DD)"
                {...register('insurance.expirationDate')}
                fullWidth
                type="date"
                error={!!errors.insurance?.expirationDate}
                helperText={errors.insurance?.expirationDate?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Copay"
                {...register('insurance.copay', { valueAsNumber: true })}
                fullWidth
                type="number"
                error={!!errors.insurance?.copay}
                helperText={errors.insurance?.copay?.message}
              />
            </Grid>
            <Grid>
              <TextField
                label="Deductible"
                {...register('insurance.deductible', { valueAsNumber: true })}
                fullWidth
                type="number"
                error={!!errors.insurance?.deductible}
                helperText={errors.insurance?.deductible?.message}
              />
            </Grid>
          </Grid>

          {/* Documents (Dynamic List with File Upload - Placeholder) */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Documents
          </Typography>
          {documentFields.map((field, index) => (
            <Paper key={field.id} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid>
                  <TextField
                    label="Document Name"
                    {...register(`documents.${index}.name`)}
                    fullWidth
                    error={!!errors.documents?.[index]?.name}
                    helperText={errors.documents?.[index]?.name?.message}
                    sx={{ mb: 1 }}
                  />
                  <Grid container spacing={2}>
                    <Grid>
                      <TextField
                        select
                        label="Document Type"
                        {...register(`documents.${index}.type`)}
                        fullWidth
                        error={!!errors.documents?.[index]?.type}
                        helperText={typeof errors.documents?.[index]?.type === 'object' && errors.documents?.[index]?.type?.message
                          ? errors.documents?.[index]?.type?.message
                          : undefined}
                      >
                        {documentTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid>
                      <TextField
                        label="Upload Date (YYYY-MM-DD)"
                        {...register(`documents.${index}.uploadDate`)}
                        fullWidth
                        type="date"
                        error={!!errors.documents?.[index]?.uploadDate}
                        helperText={errors.documents?.[index]?.uploadDate?.message}
                      />
                    </Grid>
                    <Grid>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<DriveFolderUploadIcon />}
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Upload File
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            // Handle file here. In a real app, this would involve
                            // uploading to a storage service (S3, GCS) and getting a URL.
                            // For now, this is a placeholder.
                            const file = e.target.files?.[0];
                            if (file) {
                              console.log('Selected file:', file.name, file.size, file.type);
                              // You would typically:
                              // 1. Upload the file
                              // 2. Get the URL and update form state for `documents[index].url`
                              // 3. Update `documents[index].fileSize` and `documents[index].mimeType`
                              // For this demo, we'll just log.
                              alert(`File "${file.name}" selected. (Upload logic not implemented)`);
                            }
                          }}
                        />
                      </Button>
                      {watch(`documents.${index}.name`) && (
                        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                          File: {watch(`documents.${index}.name`)} (Size:{' '}
                          {watch(`documents.${index}.fileSize`) / 1024} KB)
                        </Typography>
                      )}
                      {errors.documents?.[index]?.url && (
                        <Typography variant="caption" color="error">
                          {errors.documents?.[index]?.url?.message}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Tooltip title="Remove Document">
                    <IconButton onClick={() => removeDocument(index)} color="error">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              appendDocument({
                id: '', // Will be generated
                type: 'medical_record',
                name: '',
                uploadDate: new Date().toISOString().split('T')[0],
                fileSize: 0,
                mimeType: '',
                url: '', // Placeholder, populated after upload
              })
            }
            variant="outlined"
            sx={{ mb: 4 }}
          >
            Add Document
          </Button>

          {/* Form Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/patients')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : patientId ? (
                'Save Changes'
              ) : (
                'Create Patient'
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientForm;
