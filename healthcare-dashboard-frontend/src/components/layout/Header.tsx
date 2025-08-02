import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  onMenuOpen: () => void;
  drawerWidth: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen, drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above Drawer
        backgroundColor: 'background.paper', // Match app background
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuOpen}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon sx={{ color: 'text.primary' }} /> {/* Icon color */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
          Healthcare Dashboard
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {/* Example: User profile/settings button */}
          <Button color="inherit" sx={{ color: 'text.primary' }}>Profile</Button>
          <Button color="inherit" sx={{ color: 'text.primary' }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
