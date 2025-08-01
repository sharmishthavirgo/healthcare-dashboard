import React from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240; // Standard sidebar width

const MainLayout: React.FC<MainLayoutProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 }, // Adjust for AppBar height
          mb: { xs: 6, sm: 0 }, // Adjust for Footer height on mobile/desktop
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} /> {/* Spacer for mobile app bar */}
        <Outlet/>
        <Footer drawerWidth={drawerWidth} />
      </Box>
    </Box>
  );
};

export default MainLayout;
