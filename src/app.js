const express = require("express");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Require all routes
const authRoute = require("./routes/auth.routes");

// Using the routes
app.use("/api/auth", authRoute);

module.exports = app;
