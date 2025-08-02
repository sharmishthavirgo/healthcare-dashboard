import React, { useEffect } from 'react';
import { Box, Button, Paper, CircularProgress } from '@mui/material';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Patient } from '../../../types/patient';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { MOCK_PATIENTS } from '../../../mockData/patient'; // For fetching mock data by ID
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { patientFormSchema } from './utils';
import { PersonalInfoSection } from './PersonalInfo';
import { AddressSection } from './AddressSection';
import { EmergencyContactSection } from './EmergencyContactSection';
import { MedicalInfoSection } from './MedicalInfoSection';
import { MedicationsSection } from './MedicationsSection';
import { InsuranceInfoSection } from './InsuranceInfoSection';
import { DocumentsInfoSection } from './DocumentsInfoSection';

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
  const savePatientMutation = useMutation<{ message: string; id: string }, Error, PatientFormData>({
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
  const documentTypes = ['medical_record', 'insurance_card', 'photo_id', 'test_result', 'other'];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <PersonalInfoSection register={register} errors={errors} />
          <AddressSection register={register} errors={errors} />
          <EmergencyContactSection register={register} errors={errors} />
          <MedicalInfoSection
            register={register}
            errors={errors}
            existingPatient={existingPatient}
          />
          <MedicationsSection
            register={register}
            errors={errors}
            medicationFields={medicationFields}
            appendMedication={appendMedication}
            removeMedication={removeMedication}
            control={control}
          />
          <InsuranceInfoSection register={register} errors={errors} />
          <DocumentsInfoSection
            register={register}
            errors={errors}
            documentFields={documentFields}
            documentTypes={documentTypes}
            watch={watch}
            removeDocument={removeDocument}
          />
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
