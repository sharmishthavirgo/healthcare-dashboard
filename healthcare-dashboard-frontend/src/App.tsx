// frontend/src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './styles/theme'; // We'll create this soon
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNotifications from './components/common/AppNotifications';
import ErrorBoundary from './components/common/ErrorBoundary';

// Setup React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Don't refetch on window focus by default
      retry: 2, // Retry failed queries twice
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline /> {/* Resets CSS to a consistent baseline */}
        <ErrorBoundary>
          <BrowserRouter>
            <AppRoutes /> {/* All application routes */}
            <AppNotifications />
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
