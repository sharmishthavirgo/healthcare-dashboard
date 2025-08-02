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
const DoctorsPage = lazy(() => import('../pages/DoctorsPage'));
const NursesPage = lazy(() => import('../pages/NursesPage'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}> {/* Fallback for lazy loaded components */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/new" element={<PatientFormPage />} /> {/* New patient form */}
          <Route path="/patients/:id" element={<PatientDetailsPage />} />
          <Route path="/patients/:id/edit" element={<PatientFormPage />} /> {/* Edit patient form */}
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/nurses" element={<NursesPage />} />
        </Route>

        {/* 404 Page - always last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
