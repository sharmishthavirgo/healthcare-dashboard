import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Keep this, it's essential for TS compilation
  ],
  // Optional: If your backend is on a different port, you'll need a proxy
  server: {
    proxy: {
      '/api': { // Any request starting with /api will be proxied
        target: 'http://localhost:8000', // Your FastAPI backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding
      },
    },
  },
  optimizeDeps: {
    // Tell Vite to not pre-bundle these internal modules
    // because they are resolved by tsconfigPaths, not node_modules.
    exclude: [
      '@routes/AppRoutes',
      '@styles/theme',
      '@components/common/AppNotifications',
      '@components/common/ErrorBoundary',
      // Add any other aliases you create that might cause this issue
      '@api/axiosInstance',
      '@components/layout/MainLayout',
      '@components/layout/Header',
      '@components/layout/Sidebar',
      '@components/layout/Footer',
      '@components/common/LoadingSpinner',
      '@mockData/patients',
      '@utils/dateUtils',
      '@store/authStore',
      '@store/notificationStore',
      '@store/formDraftStore',
      '@features/patients/components/PatientList',
      '@features/patients/components/PatientForm',
      '@pages/DashboardPage',
      '@pages/PatientsPage',
      '@pages/PatientDetailsPage',
      '@pages/PatientFormPage',
      '@pages/NotFoundPage',
      '@pages/DoctorsPage',
      '@pages/SettingsPage',
      '@pages/LoginPage',
      // ... and any others that come up
    ],
  },
});