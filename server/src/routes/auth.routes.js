const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

//-------------------------------

// Create a router for authentication-related routes
const authRouter = express.Router();

//-------------------------------

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUser);

//-------------------------------

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password, generate a JWT token, and set it in an HTTP-only cookie
 * @access Public
 */
authRouter.post("/login", authController.loginUser);

//-------------------------------

/**
 * @route GET /api/auth/logout
 * @description Logout a user by invalidating the JWT token (e.g., by adding it to a blacklist) and clearing the cookie
 * @access Public
 */
authRouter.get("/logout", authController.logoutUser);

//-------------------------------

/**
 * @route GET /api/auth/profile
 * @description Get the profile of the currently logged-in user (requires authentication)
 * @access Private
 */
authRouter.get("/profile", authMiddleware, authController.getUserProfile);

module.exports = authRouter;
