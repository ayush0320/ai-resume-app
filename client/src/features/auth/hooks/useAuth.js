// This custom hook provides authentication-related functionality to components that need it.
// It uses the authContext to access and manage the user's authentication state, including the user object and loading state.
// The hook also defines functions for handling login and registration, which interact with the auth service to perform
// the necessary API calls and update the context accordingly.

import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getProfile } from "../services/auth.api.js";

// Custom hook to manage authentication state and actions
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  // Function to handle user login
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user registration
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null); // Clear the user state on logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch the user's profile information when the component mounts
  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getProfile();
      setUser(data.user);
      setLoading(false);
    };

    getAndSetUser();
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchProfile,
  };
};
