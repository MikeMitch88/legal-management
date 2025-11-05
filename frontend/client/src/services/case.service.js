/**
 * Case Service
 * Handles all case-related API calls
 */

import apiService from './api.service';
import API_CONFIG from '../config/api.config';

const caseService = {
  /**
   * Get all cases
   * @returns {Promise} List of cases
   */
  getAllCases: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.CASES.LIST);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new case
   * @param {Object} caseData - Case data
   * @returns {Promise} Created case
   */
  createCase: async (caseData) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.CASES.CREATE,
        caseData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update case
   * @param {number} caseId - Case ID
   * @param {Object} caseData - Updated case data
   * @returns {Promise} Updated case
   */
  updateCase: async (caseId, caseData) => {
    try {
      const response = await apiService.put(
        API_CONFIG.ENDPOINTS.CASES.UPDATE(caseId),
        caseData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete case
   * @param {number} caseId - Case ID
   * @returns {Promise} Deletion result
   */
  deleteCase: async (caseId) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.CASES.DELETE(caseId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get case statistics
   * @returns {Promise} Statistics data
   */
  getStatistics: async () => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.CASES.STATISTICS
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default caseService;
