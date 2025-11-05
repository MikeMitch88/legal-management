/**
 * API Service
 * Centralized Axios instance with interceptors for all HTTP requests
 */

import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('[API Error] Unauthorized access');
          localStorage.removeItem('access_token');
          localStorage.removeItem('role');
          window.location.href = '/login';
          break;

        case 403:
          console.error('[API Error] Forbidden access');
          break;

        case 404:
          console.error('[API Error] Resource not found');
          break;

        case 500:
          console.error('[API Error] Server error');
          break;

        default:
          console.error(`[API Error] ${status}:`, data);
      }

      // Return formatted error
      return Promise.reject({
        status,
        message: data.message || data.error || 'An error occurred',
        data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('[API Error] No response received', error.request);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        error,
      });
    } else {
      // Error in request setup
      console.error('[API Error] Request setup error', error.message);
      return Promise.reject({
        message: error.message || 'An error occurred',
        error,
      });
    }
  }
);

// API Service methods
const apiService = {
  // Generic HTTP methods
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),

  // File upload
  upload: (url, formData, onUploadProgress) => {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },

  // Download file
  download: (url, filename) => {
    return apiClient.get(url, {
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  },
};

export default apiService;
export { apiClient };
