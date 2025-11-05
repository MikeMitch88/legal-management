/**
 * User Service
 * Handles all user-related API calls
 */

import apiService from './api.service';
import API_CONFIG from '../config/api.config';

const userService = {
  /**
   * Get all users
   * @returns {Promise} List of users
   */
  getAllUsers: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.USERS.LIST);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise} Created user
   */
  createUser: async (userData) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.USERS.CREATE,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user
   * @param {number} userId - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} Updated user
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await apiService.put(
        API_CONFIG.ENDPOINTS.USERS.UPDATE(userId),
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete user
   * @param {number} userId - User ID
   * @returns {Promise} Deletion result
   */
  deleteUser: async (userId) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.USERS.DELETE(userId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
