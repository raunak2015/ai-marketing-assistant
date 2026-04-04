// Auth service - wraps api.js calls for convenience
import api from './api';

export const authService = {
  login: (email, password) => api.login(email, password),
  register: (userData) => api.register(userData),
  logout: () => {
    localStorage.removeItem('viralPulseToken');
    localStorage.removeItem('viralPulseUser');
  },
  getUser: () => {
    const user = localStorage.getItem('viralPulseUser');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => !!localStorage.getItem('viralPulseToken'),
};

export default authService;
