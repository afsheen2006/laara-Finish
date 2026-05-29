import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace('5000', '5001');

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach user email on every request so backend admin middleware can verify access
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('user');
        if (raw) {
          const user = JSON.parse(raw);
          if (user?.email) {
            config.headers['x-user-email'] = user.email;
          }
        }
      } catch (_) {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.response?.data?.message || error.message || 'API Error';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;