// Frontend communication with backend for authentication related operations
// using axios for making HTTP requests

import axios from "axios";

// Create an axios instance with default configuration for authentication API
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth", // Base URL for the authentication API
  withCredentials: true, // to include cookies in the request
});

// Base URL for the authentication API
export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data; // return the response data (e.g., user info, token)
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// Function to handle user login
export async function login(email, password) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data; // return the response data (e.g., user info, token)
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

// Function to handle user logout
export async function logout() {
  try {
    const response = await api.get("/logout");
    return response.data; // return the response data (e.g., success message)
  } catch (error) {
    console.log("Error logging out", error);
    throw error;
  }
}

// Function to get the currently authenticated user's profile information
export async function getProfile() {
  try {
    const response = await api.get("/profile");
    return response.data; // return the response data (e.g., user info)
  } catch (error) {
    console.log("Error getting user data", error);
    throw error;
  }
}
