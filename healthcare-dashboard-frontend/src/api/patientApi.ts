// src/api/patientApi.ts
import axios from 'axios';

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You might add authorization headers here later
    // 'Authorization': `Bearer ${yourAuthToken}`
  },
});

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
}

interface NewPatient {
  name: string;
  age: number;
  condition: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await apiClient.get<Patient[]>('/patients'); // /api/patients
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error; // Re-throw to be handled by the component or React Query
  }
};

export const createPatient = async (patientData: NewPatient): Promise<Patient> => {
  try {
    const response = await apiClient.post<{ message: string; patient: Patient }>('/patients', patientData);
    return response.data.patient; // Assuming your backend returns the created patient
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

// You'll add more functions here for other API endpoints (e.g., updatePatient, deletePatient)