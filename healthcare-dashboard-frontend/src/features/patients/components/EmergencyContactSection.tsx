import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Patient } from '../../../types/patient';

interface EmergencyContactSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
}
export const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({
  register,
  errors,
}) => {
  return (
    <>
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
    </>
  );
};
