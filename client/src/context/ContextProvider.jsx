import React, { createContext } from 'react';

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  const userRole = 'admin'; // Replace this with actual logic to retrieve the user's role
  const authenticated = false; // Replace with actual authentication status

  return (
    <userContext.Provider value={{ userRole, authenticated }}>
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
