// frontend/src/pages/LoginPage.tsx
import React from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    alert('Logged in! (Demo)');
    navigate('/'); // Redirect to dashboard
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'primary.light',
        py: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Dashboard Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" variant="outlined" required fullWidth />
          <TextField label="Password" type="password" variant="outlined" required fullWidth />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
