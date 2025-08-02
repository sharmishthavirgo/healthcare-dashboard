import { Patient } from '../types/patient';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-04-12',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: { street: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '90210', country: 'USA' },
    emergencyContact: { name: 'Jane Doe', relationship: 'Spouse', phone: '987-654-3210' },
    medicalInfo: {
      allergies: ['Peanuts'],
      currentMedications: [{ name: 'Lisinopril', dosage: '10mg', frequency: 'daily' }],
      conditions: ['Hypertension', 'Diabetes'],
      bloodType: 'A+',
      lastVisit: '2024-06-15',
      status: 'active',
    },
    insurance: {
      provider: 'BlueCross', policyNumber: 'ABC12345', effectiveDate: '2020-01-01', expirationDate: '2025-12-31',
      copay: 0,
      deductible: 0
    },
    documents: [],
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2024-07-27T10:00:00Z',
  },
  {
    id: 'pat-002',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1990-08-25',
    email: 'jane.smith@example.com',
    phone: '234-567-8901',
    address: { street: '456 Oak Ave', city: 'Otherville', state: 'NY', zipCode: '10001', country: 'USA' },
    emergencyContact: { name: 'John Smith', relationship: 'Husband', phone: '876-543-2109' },
    medicalInfo: {
      allergies: [],
      currentMedications: [],
      conditions: ['Asthma'],
      bloodType: 'B-',
      lastVisit: '2023-11-20',
      status: 'inactive',
    },
    insurance: { provider: 'Aetna', policyNumber: 'DEF67890', effectiveDate: '2021-03-01', expirationDate: '2026-02-28', copay: 20, deductible: 500 },
    documents: [],
    createdAt: '2023-02-01T11:00:00Z',
    updatedAt: '2024-07-27T11:00:00Z',
  },
  // ... add more mock patients up to 20 for MOCK_PATIENTS
];

export const LARGE_MOCK_PATIENTS: Patient[] = Array.from({ length: 10 }, (_, i) => ({
  id: `pat-${String(i + 1).padStart(4, '0')}`,
  firstName: `Patient${i + 1}`,
  lastName: `Last${i + 1}`,
  dateOfBirth: `19${(80 + (i % 20))}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  email: `patient${i + 1}@example.com`,
  phone: `555-123-${String(i + 1).padStart(4, '0').slice(-4)}`,
  address: { street: `${i + 1} Elm St`, city: 'Gridtown', state: 'TX', zipCode: '75001', country: 'USA' },
  emergencyContact: { name: `EC${i + 1}`, relationship: 'Friend', phone: `555-999-${String(i + 1).padStart(4, '0').slice(-4)}` },
  medicalInfo: {
    allergies: i % 3 === 0 ? ['Dust'] : [],
    currentMedications: i % 5 === 0 ? [{ name: 'Painkiller', dosage: '1 pill', frequency: 'daily' }] : [],
    conditions: i % 2 === 0 ? ['Flu'] : [],
    bloodType: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][i % 8] as 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    lastVisit: `202${(i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    status: ['active', 'inactive', 'critical'][i % 3] as 'active' | 'inactive' | 'critical',
  },
  insurance: { provider: 'HealthPlus', policyNumber: `POL${String(i + 1).padStart(5, '0')}`, effectiveDate: '2022-01-01', expirationDate: '2027-12-31', copay: 20, deductible: 500 },
  documents: [],
  createdAt: `2023-${String((i % 12) + 1).padStart(2, '0')}-01T10:00:00Z`,
  updatedAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-01T11:00:00Z`,
}));
