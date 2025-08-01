export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  effectiveDate: string; // YYYY-MM-DD
  expirationDate: string; // YYYY-MM-DD
  copay: number;
  deductible: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string; // ISO string
  url: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  email: string;
  phone: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalInfo: {
    allergies: string[];
    currentMedications: Medication[];
    conditions: string[];
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    lastVisit: string; // YYYY-MM-DD
    status: 'active' | 'inactive' | 'critical';
  };
  insurance: InsuranceInfo;
  documents: Document[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}