/**
 * Client Service
 * Handles all client-related API calls
 */

import apiService from './api.service';
import API_CONFIG from '../config/api.config';

const clientService = {
  /**
   * Get all clients
   * @returns {Promise} List of clients
   */
  getAllClients: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.CLIENTS.LIST);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new client
   * @param {Object} clientData - Client data
   * @returns {Promise} Created client
   */
  createClient: async (clientData) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.CLIENTS.CREATE,
        clientData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update client
   * @param {number} clientId - Client ID
   * @param {Object} clientData - Updated client data
   * @returns {Promise} Updated client
   */
  updateClient: async (clientId, clientData) => {
    try {
      const response = await apiService.put(
        API_CONFIG.ENDPOINTS.CLIENTS.UPDATE(clientId),
        clientData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete client
   * @param {number} clientId - Client ID
   * @returns {Promise} Deletion result
   */
  deleteClient: async (clientId) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.CLIENTS.DELETE(clientId)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search clients
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  searchClients: async (query) => {
    try {
      const response = await apiService.get(
        `${API_CONFIG.ENDPOINTS.CLIENTS.SEARCH}?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientService;
