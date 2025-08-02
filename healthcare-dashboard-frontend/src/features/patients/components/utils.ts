import { z } from 'zod';

// --- Zod Schema for Validation ---// This schema defines the structure and validation rules for patient data in the healthcare dashboard.
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format (e.g., 12345 or 12345-6789)'),
  country: z.string().min(1, 'Country is required'),
});

const emergencyContactSchema = z.object({
  name: z.string().min(1, 'Emergency contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format (10 digits)'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
});

const medicationSchema = z.object({
  id: z.string().optional(), // ID is optional for new medications before saving
  name: z.string().min(1, 'Medication name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  prescribedBy: z.string().min(1, 'Prescriber is required'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean(),
});

const insuranceInfoSchema = z.object({
  provider: z.string().min(1, 'Insurance provider is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  groupNumber: z.string().optional().or(z.literal('')),
  effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional()
    .or(z.literal('')),
  copay: z.number().min(0, 'Copay must be non-negative'),
  deductible: z.number().min(0, 'Deductible must be non-negative'),
});

const documentSchema = z.object({
  id: z.string().optional(), // ID is optional for new documents before upload
  type: z.enum(['medical_record', 'insurance_card', 'photo_id', 'test_result', 'other']),
  name: z.string().min(1, 'Document name is required'),
  uploadDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  fileSize: z.number().min(0, 'File size must be non-negative'),
  mimeType: z.string().min(1, 'Mime type is required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')), // URL might be temporary or empty before upload
});

// Main Patient Schema (for form data)
export const patientFormSchema = z.object({
  id: z.string().optional(), // Optional for new patients
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth is required (YYYY-MM-DD)'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format (10 digits)'),
  address: addressSchema,
  emergencyContact: emergencyContactSchema,
  medicalInfo: z.object({
    allergies: z.array(z.string()).optional(),
    currentMedications: z.array(medicationSchema).optional(),
    conditions: z.array(z.string()).optional(),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      message: 'Invalid blood type',
    }),
    lastVisit: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Last Visit date is required (YYYY-MM-DD)'),
    status: z.enum(['active', 'inactive', 'critical'], { message: 'Invalid status' }),
  }),
  insurance: insuranceInfoSchema,
  documents: z.array(documentSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
