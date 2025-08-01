// frontend/src/routes/AppRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoadingSpinner from '../components/common/LoadingSpinner'; // We'll create this

// Lazy load page components for code splitting
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const PatientsPage = lazy(() => import('../pages/PatientsPage'));
const PatientDetailsPage = lazy(() => import('../pages/PatientDetailsPage'));
const PatientFormPage = lazy(() => import('../pages/PatientFormPage')); // For creating/editing
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Placeholder pages
// const DoctorsPage = lazy(() => import('../pages/DoctorsPage'));
// const SettingsPage = lazy(() => import('@pages/SettingsPage'));
// const LoginPage = lazy(() => import('@pages/LoginPage')); // Assuming initial login page

const AppRoutes: React.FC = () => {
  // In a real app, you'd have logic here to check if the user is authenticated
  // and redirect or use a <ProtectedRoute> component. For this assessment,
  // we'll assume public access for now or just render directly.

  return (
    <Suspense fallback={<LoadingSpinner />}> {/* Fallback for lazy loaded components */}
      <Routes>
        {/* Public routes (e.g., Login) */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Protected routes (e.g., Dashboard, Patients, etc.) */}
        {/* We wrap these in MainLayout to provide consistent UI */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/new" element={<PatientFormPage />} /> {/* New patient form */}
          <Route path="/patients/:id" element={<PatientDetailsPage />} />
          <Route path="/patients/:id/edit" element={<PatientFormPage />} /> {/* Edit patient form */}
          {/* <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Route>

        {/* 404 Page - always last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
