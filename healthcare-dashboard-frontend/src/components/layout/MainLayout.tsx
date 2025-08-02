// frontend/src/components/MainLayout.tsx

import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuOpen={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onMobileClose={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flex: '1 1 auto', // Allows this main content area to grow
          flexGrow: 1,
          // Remove padding (p: 3) from here. We'll apply it via Container on individual pages.
          // p: 3, // REMOVE THIS LINE
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          mb: { xs: 6, sm: 0 },
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} /> {/* Spacer for mobile app bar */}

        {/* Wrap Outlet in a Box that can grow */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;