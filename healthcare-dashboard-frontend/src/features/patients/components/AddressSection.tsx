import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Patient } from '../../../types/patient';

interface AddressSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ register, errors }) => {
  return (
    <>
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
    </>
  );
};
