// frontend/src/pages/PatientFormPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import PatientForm from '../features/patients/components/PatientForm';

const PatientFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 , ml: 3 }}>
        {isEditMode ? `Edit Patient: ${id}` : 'Create New Patient'}
      </Typography>
       <PatientForm patientId={id}/>
    </Box>
  );
};

export default PatientFormPage;
