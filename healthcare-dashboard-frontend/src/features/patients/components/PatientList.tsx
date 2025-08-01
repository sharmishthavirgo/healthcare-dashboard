import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, InputAdornment, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import { MOCK_PATIENTS, LARGE_MOCK_PATIENTS } from '../../../mockData/patient';
import { Link } from 'react-router-dom';
import { format, differenceInYears, parseISO } from 'date-fns';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { Patient } from '../../../types/patient';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const getAge = (dateOfBirth: string): number => {
  const birthDate = parseISO(dateOfBirth);
  return differenceInYears(new Date(), birthDate);
};

const getStatusChipColor = (
  status: Patient['medicalInfo']['status'],
): 'success' | 'warning' | 'error' | 'default' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    case 'critical':
      return 'error';
    default:
      return 'default';
  }
};

const fetchPatients = async (useLargeData: boolean = false): Promise<Patient[]> => {
  console.log('Fetching patients...');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return useLargeData ? LARGE_MOCK_PATIENTS : MOCK_PATIENTS;
};

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [useLargeDataset, setUseLargeDataset] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const {
    data: patients,
    isLoading,
    isError,
    error,
  } = useQuery<Patient[], Error>({
    queryKey: ['patients', useLargeDataset],
    queryFn: () => fetchPatients(useLargeDataset),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    const patientsWithName = patients.map((patient) => ({
      ...patient,
      name: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
      lastVisit: patient.medicalInfo.lastVisit,
    }));

    if (!searchTerm) {
      return patientsWithName;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return patientsWithName.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.phone.includes(searchTerm) ||
        patient.medicalInfo.status.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.medicalInfo.conditions.some((condition) =>
          condition.toLowerCase().includes(lowerCaseSearchTerm),
        ),
    );
  }, [patients, searchTerm]);

  const columns: GridColDef<Patient>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1.5,
        minWidth: 180,
        valueGetter: (params: string) => {
          if (!params) return '';
          return params;
        },
      },
      {
        field: 'dateOfBirth',
        headerName: 'Age',
        width: 80,
        type: 'number',
        valueGetter: (params: string) => {
          if (!params) return null;
          return getAge(params);
        },
      },
      { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
      { field: 'phone', headerName: 'Phone', width: 150 },
      {
        field: 'lastVisit', // changed from 'medicalInfo'
        headerName: 'Last Visit',
        width: 150,
        type: 'date',
        valueGetter: (params: string) => {
          if (!params) return null;
          return parseISO(params);
        },
        valueFormatter: (params: string) => {
          if (!params) return '';
          return format(params, 'MMM dd, yyyy');
        },
      },
      {
        field: 'status', // changed from 'medicalInfo'
        headerName: 'Status',
        width: 120,
        renderCell: (params: { row: Patient }) => {
          if (!params || !params.row.medicalInfo) return null;
          if (!params.row.medicalInfo.status) return null;
          return (
            <Chip
              label={params.row.medicalInfo.status}
              color={getStatusChipColor(params.row.medicalInfo.status)}
              size="small"
            />
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        width: 180,
        renderCell: (params) => {
          if (!params.row || !params.row.id) return null;
          return (
            <>
              <Button
                component={Link}
                to={`/patients/${params.row.id}`}
                size="small"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                View
              </Button>
              <Button
                component={Link}
                to={`/patients/${params.row.id}/edit`}
                size="small"
                variant="outlined"
                color="secondary"
              >
                Edit
              </Button>
            </>
          );
        },
      },
    ],
    [],
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading patients: {error?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Patient List ({filteredPatients.length})</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setUseLargeDataset(!useLargeDataset)}
            sx={{ mr: 2 }}
          >
            Switch to {useLargeDataset ? 'Small (20)' : 'Large (1500+)'} Data
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} component={Link} to="/patients/new">
            Add New Patient
          </Button>
        </Box>
      </Box>

      <TextField
        label="Search Patients"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredPatients}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      {/* The NoRowsOverlay is a better way to show this within DataGrid, but this external check still works */}
      {filteredPatients.length === 0 && !isLoading && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No patients found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default PatientList;