import React from 'react';
import { Typography, Grid, TextField, Button, Paper, Tooltip, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FieldErrors, UseFormRegister, Controller, Control } from 'react-hook-form';
import { Medication, Patient } from '../../../types/patient';

interface AddressSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
  medicationFields: Medication[];
  appendMedication: (medication: Medication) => void;
  removeMedication: (index: number) => void;
  control: Control<Patient>;
}

export const MedicationsSection: React.FC<AddressSectionProps> = ({
  register,
  errors,
  medicationFields,
  appendMedication,
  removeMedication,
  control
}) => {
  return (
    <>
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
                    helperText={errors.medicalInfo?.currentMedications?.[index]?.dosage?.message}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="Frequency"
                    {...register(`medicalInfo.currentMedications.${index}.frequency`)}
                    fullWidth
                    error={!!errors.medicalInfo?.currentMedications?.[index]?.frequency}
                    helperText={errors.medicalInfo?.currentMedications?.[index]?.frequency?.message}
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
                    helperText={errors.medicalInfo?.currentMedications?.[index]?.startDate?.message}
                  />
                </Grid>
                <Grid>
                  <TextField
                    label="End Date (Optional YYYY-MM-DD)"
                    {...register(`medicalInfo.currentMedications.${index}.endDate`)}
                    fullWidth
                    type="date"
                    error={!!errors.medicalInfo?.currentMedications?.[index]?.endDate}
                    helperText={errors.medicalInfo?.currentMedications?.[index]?.endDate?.message}
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
                          onChange={(e) => field.onChange(e.target.checked)}
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
    </>
  );
};
