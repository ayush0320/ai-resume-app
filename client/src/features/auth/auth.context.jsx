// This file is used to create the context for authentication,
// which will be used to manage the authentication state of the user
// throughout the application.
// It will provide a way to store and access the user's authentication status,
// as well as any relevant user information.

import { createContext, use, useState } from "react";

// The context will hold the authentication state and any relevant user information
export const AuthContext = createContext({});

// The provider component will wrap the application and provide the authentication state to all components
// It will also provide functions to update the authentication state (e.g., login, logout)
// to be used by the components that need to access or modify the authentication state.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // to store the authenticated user's information
  const [loading, setLoading] = useState(false); // to indicate whether the authentication process is in progress

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
