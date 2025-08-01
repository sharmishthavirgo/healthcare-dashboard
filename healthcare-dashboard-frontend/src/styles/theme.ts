// frontend/src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // A standard blue for primary actions
    },
    secondary: {
      main: '#dc004e', // A standard red for secondary actions
    },
    background: {
      default: '#f4f6f8', // Light grey background
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#212B36', // Dark text for readability
      secondary: '#637381', // Muted text
    },
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.125rem', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flat buttons
      },
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase text
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // No shadow for a cleaner look
          borderBottom: '1px solid #e0e0e0', // Subtle border
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#212B36', // Dark sidebar background
          color: '#ffffff', // White text for sidebar
        },
      },
    },
  },
});
