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
  id?: string; 
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD, optional
  isActive: boolean;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  effectiveDate: string; // YYYY-MM-DD
  expirationDate?: string; // YYYY-MM-DD
  copay: number;
  deductible: number;
}

export interface Document {
  id?: string;
  name: string;
  type: 'medical_record' | 'insurance_card' | 'photo_id' | 'test_result' | 'other';
  uploadDate: string; // ISO string
  url?: string;
  fileSize: number; // Size in bytes
  mimeType: string; // e.g., 'application/pdf', 'image/jpeg'
}

export interface Patient {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  email: string;
  phone: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalInfo: {
    allergies?: string[];
    currentMedications?: Medication[];
    conditions?: string[];
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    lastVisit: string; // YYYY-MM-DD
    status: 'active' | 'inactive' | 'critical';
  };
  insurance: InsuranceInfo;
  documents?: Document[];
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}