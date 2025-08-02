// frontend/src/components/common/ErrorBoundary.tsx
import  { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true, error: null, errorInfo: null }; // Reset error/errorInfo, set hasError
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
        error: error,
        errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {

      return this.props.fallback || (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: 'error.main',
            color: 'white',
            p: 4,
          }}
        >
          <Paper elevation={6} sx={{ p: 4, borderRadius: 2, backgroundColor: 'white', color: 'text.primary' }}>
            <Typography variant="h4" gutterBottom>
              Something went wrong.
            </Typography>
            <Typography variant="body1" >
              We're sorry for the inconvenience. Please try again later.
            </Typography>
            {/* Optional: Display error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '16px', color: 'text.secondary' }}>
                <summary>Error Details</summary>
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </details>
            )}
            <Button
              variant="contained"
              onClick={() => window.location.reload()} // Simple reload
              sx={{ mt: 3 }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
