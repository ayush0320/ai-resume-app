const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { authUser } = require("../middleware/auth.middleware.js");

//-------------------------------

// Create a router for authentication-related routes
const authRouter = express.Router();

//-------------------------------

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

//-------------------------------

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password, generate a JWT token, and set it in an HTTP-only cookie
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

//-------------------------------

/**
 * @route GET /api/auth/logout
 * @description Logout a user by invalidating the JWT token (e.g., by adding it to a blacklist) and clearing the cookie
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

//-------------------------------

/**
 * @route GET /api/auth/profile
 * @description Get the profile of the currently logged-in user (requires authentication)
 * @access Private
 */
authRouter.get("/profile", authUser, authController.getMeController);

module.exports = authRouter;
