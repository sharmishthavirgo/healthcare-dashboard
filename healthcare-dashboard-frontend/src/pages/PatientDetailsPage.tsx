// frontend/src/pages/PatientDetailsPage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Patient Details</Typography>
      <Typography variant="h6">Patient ID: {id}</Typography>
      <Typography variant="body1">
        This page will display comprehensive details for patient {id}.
      </Typography>
      {/* Patient details components */}
    </Box>
  );
};

export default PatientDetailsPage;