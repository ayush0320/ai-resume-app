const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//===============================
// User Registration Controller
//===============================

// Implement the registerUser function to create a new user, hash the password, and generate a JWT token
/**
 * @name registerUser
 * @desc Register a new user, hash the password, and save the user to the database
 * @route POST /api/auth/register
 * @access Public
 */

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hash,
    });

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    // Return the user data without the password
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
}

//===============================
// User Login Controller
//===============================

// Implement the loginUser function to authenticate users and generate JWT tokens
/**
 * @name loginUser
 * @desc Authenticate a user, generate a JWT token, expects email and password in the request body
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    // Return the user data without the password
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Error logging in user" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
