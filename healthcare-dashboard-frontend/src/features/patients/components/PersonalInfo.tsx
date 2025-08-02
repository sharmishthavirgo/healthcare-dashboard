import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Patient } from '../../../types/patient';

interface PersonalInfoSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ register, errors }) => {
  return (
    <>
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
            type="date"
            InputLabelProps={{ shrink: true }}
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
    </>
  );
};
