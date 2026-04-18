const express = require("express");
const authController = require("../controllers/auth.controller.js");

// Create a router for authentication-related routes
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password, generate a JWT token, and set it in an HTTP-only cookie
 * @access Public
 */
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;
