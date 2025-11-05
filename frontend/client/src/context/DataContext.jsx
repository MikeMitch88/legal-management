/**
 * Data Context
 * Manages application data (cases, clients, users)
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import caseService from '../services/case.service';
import clientService from '../services/client.service';
import userService from '../services/user.service';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch all cases
   */
  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      const data = await caseService.getAllCases();
      setCases(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch all clients
   */
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await clientService.getAllClients();
      setClients(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch all users
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch statistics
   */
  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await caseService.getStatistics();
      setStatistics(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add new case
   */
  const addCase = useCallback((newCase) => {
    setCases((prev) => [...prev, newCase]);
  }, []);

  /**
   * Update case
   */
  const updateCase = useCallback((caseId, updatedData) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, ...updatedData } : c))
    );
  }, []);

  /**
   * Delete case
   */
  const deleteCase = useCallback((caseId) => {
    setCases((prev) => prev.filter((c) => c.id !== caseId));
  }, []);

  /**
   * Add new client
   */
  const addClient = useCallback((newClient) => {
    setClients((prev) => [...prev, newClient]);
  }, []);

  /**
   * Update client
   */
  const updateClient = useCallback((clientId, updatedData) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, ...updatedData } : c))
    );
  }, []);

  /**
   * Delete client
   */
  const deleteClient = useCallback((clientId) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  }, []);

  /**
   * Refresh all data
   */
  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchCases(),
      fetchClients(),
      fetchUsers(),
      fetchStatistics(),
    ]);
  }, [fetchCases, fetchClients, fetchUsers, fetchStatistics]);

  const value = {
    cases,
    clients,
    users,
    statistics,
    loading,
    fetchCases,
    fetchClients,
    fetchUsers,
    fetchStatistics,
    addCase,
    updateCase,
    deleteCase,
    addClient,
    updateClient,
    deleteClient,
    refreshAll,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
