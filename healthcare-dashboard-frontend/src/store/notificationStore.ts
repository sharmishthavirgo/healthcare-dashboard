import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timeout?: number; // Milliseconds, 0 for persistent
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type'], timeout?: number) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  addNotification: (message, type = 'info', timeout = 5000) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newNotification: Notification = { id, message, type, timeout };
    set((state) => ({ notifications: [...state.notifications, newNotification] }));

    if (timeout > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, timeout);
    }
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
