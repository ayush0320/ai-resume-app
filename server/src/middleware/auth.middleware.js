// Authentication middleware to protect routes and verify JWT tokens
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
    });
  }

  const blacklistedToken = await tokenBlacklistModel.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({
      message: "Token has been invalidated, authorization denied",
    });
  }

  try {
    // Verify the token and extract the user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach the decoded user information to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token, authorization denied",
    });
  }
}

module.exports = authUser;
