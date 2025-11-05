/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import apiService from './api.service';
import API_CONFIG from '../config/api.config';

const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} User data and token
   */
  login: async (email, password) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      // Store token and role if login successful
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  },

  /**
   * Get current user role
   * @returns {string|null} User role
   */
  getCurrentRole: () => {
    return localStorage.getItem('role');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  /**
   * Get access token
   * @returns {string|null} Access token
   */
  getToken: () => {
    return localStorage.getItem('access_token');
  },
};

export default authService;
