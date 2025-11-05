/**
 * Custom hook for handling async operations with loading and error states
 */

import { useState, useCallback } from 'react';

export const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute async function with loading and error handling
   */
  const execute = useCallback(async (asyncFunction, onSuccess, onError) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();

      if (onSuccess) {
        onSuccess(result);
      }

      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset error state
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    resetError,
  };
};

export default useAsync;
