// frontend/src/pages/PatientsPage.tsx
import PatientList from '../features/patients/components/PatientList'; // Adjust path if needed
import { Box } from '@mui/material';

const PatientsPage: React.FC  = () => {
  console.log('PatientsPage');
  return (
    <Box>
      <PatientList />
    </Box>
  );
};

export default PatientsPage;
