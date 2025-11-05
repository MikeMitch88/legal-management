/**
 * API Configuration
 * Centralized configuration for all API-related settings
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 10000,

  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/login',
      LOGOUT: '/logout',
      REFRESH: '/refresh',
      VERIFY: '/verify',
    },
    USERS: {
      BASE: '/users',
      CREATE: '/create-user',
      UPDATE: (id) => `/users/${id}`,
      DELETE: (id) => `/users/${id}`,
      LIST: '/users',
    },
    CLIENTS: {
      BASE: '/clients',
      CREATE: '/create-client',
      UPDATE: (id) => `/clients/${id}`,
      DELETE: (id) => `/clients/${id}`,
      LIST: '/clients',
      SEARCH: '/clients/search',
    },
    CASES: {
      BASE: '/cases',
      CREATE: '/create-case',
      UPDATE: (id) => `/update-case/${id}`,
      DELETE: (id) => `/delete-case/${id}`,
      LIST: '/cases',
      STATISTICS: '/cases/statistics',
    },
    UPLOADS: {
      FILE: '/upload',
      DOCUMENTS: '/documents',
      DELETE: (id) => `/documents/${id}`,
    },
  },
};

export default API_CONFIG;
