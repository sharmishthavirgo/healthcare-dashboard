import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Patient } from '../../../types/patient';

interface InsuranceInfoSectionProps {
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
}

export const InsuranceInfoSection: React.FC<InsuranceInfoSectionProps> = ({ register, errors }) => {
  return(
    <>
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
    </>
  );
};
