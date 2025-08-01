// frontend/src/components/common/AppNotifications.tsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '../../store/notificationStore';
import { Box } from '@mui/material';

const AppNotifications: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  const handleClose = (id: string) => {
    removeNotification(id);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true} // Always open as they are added and removed
          autoHideDuration={notification.timeout || null}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ mb: 1 }} // Stack notifications
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default AppNotifications;
