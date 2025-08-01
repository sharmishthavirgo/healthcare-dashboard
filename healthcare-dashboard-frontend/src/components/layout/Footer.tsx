// frontend/src/components/layout/Footer.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface FooterProps {
  drawerWidth: number;
}

const Footer: React.FC<FooterProps> = ({ drawerWidth }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', // Pushes footer to the bottom
        backgroundColor: 'background.paper',
        borderTop: '1px solid #e0e0e0',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          {'© '}
          {new Date().getFullYear()}
          {' Healthcare Dashboard. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
