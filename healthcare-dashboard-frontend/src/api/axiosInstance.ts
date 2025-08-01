// frontend/src/api/axiosInstance.ts
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.token; // Assuming your user object stores a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401, 403)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { addNotification } = useNotificationStore.getState();
    const { logout } = useAuthStore.getState();

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.detail || error.message;

      if (statusCode === 401) {
        addNotification('Authentication required. Please log in.', 'error');
        logout(); // Clear user session
        // Optionally redirect to login page if not already there
        window.location.href = '/login';
      } else if (statusCode === 403) {
        addNotification('You do not have permission to perform this action.', 'error');
      } else if (statusCode >= 400 && statusCode < 500) {
        addNotification(`Client error: ${errorMessage}`, 'warning');
      } else if (statusCode >= 500) {
        addNotification(`Server error: ${errorMessage}. Please try again later.`, 'error');
      }
    } else if (error.request) {
      // The request was made but no response was received
      addNotification('No response from server. Please check your internet connection.', 'error', 0); // Persistent
    } else {
      // Something happened in setting up the request that triggered an Error
      addNotification(`Request error: ${error.message}`, 'error');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
