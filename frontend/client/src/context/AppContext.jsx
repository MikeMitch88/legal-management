/**
 * Application Context
 * Manages global application state
 */

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /**
   * Show notification
   */
  const showNotification = (type, title, message) => {
    const notification = {
      id: Date.now(),
      type, // 'success', 'error', 'warning', 'info'
      title,
      message,
      timestamp: new Date(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  /**
   * Remove notification
   */
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  /**
   * Show success notification
   */
  const showSuccess = (message, title = 'Success') => {
    showNotification('success', title, message);
  };

  /**
   * Show error notification
   */
  const showError = (message, title = 'Error') => {
    showNotification('error', title, message);
  };

  /**
   * Show warning notification
   */
  const showWarning = (message, title = 'Warning') => {
    showNotification('warning', title, message);
  };

  /**
   * Show info notification
   */
  const showInfo = (message, title = 'Info') => {
    showNotification('info', title, message);
  };

  /**
   * Toggle sidebar
   */
  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const value = {
    loading,
    setLoading,
    notifications,
    showNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    sidebarCollapsed,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
