import React from 'react';
import { Typography, Grid, TextField, MenuItem } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Patient } from '../../../types/patient';

interface MedicalInfoSectionProps {
  register: UseFormRegister<Patient>
  errors: FieldErrors<Patient>;
  existingPatient?: Patient;
}
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const MedicalInfoSection: React.FC<MedicalInfoSectionProps> = ({
  register,
  errors,
  existingPatient,
}) => {
  return (
    <>
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
            {bloodTypes.map((type: string) => (
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
    </>
  );
};
