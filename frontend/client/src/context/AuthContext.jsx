/**
 * Authentication Context
 * Manages authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      const userRole = authService.getCurrentRole();

      if (token && userRole) {
        setIsAuthenticated(true);
        setRole(userRole);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);

      setUser(data.user || { email });
      setRole(data.role);
      setIsAuthenticated(true);

      return { success: true, data };
    } catch (error) {
      setIsAuthenticated(false);
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles) => {
    return roles.includes(role);
  };

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
