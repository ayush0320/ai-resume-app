const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
// This will allow us to read cookies from the request,
//  which is necessary for handling JWT tokens stored in cookies
app.use(cookieParser());

// Require all routes
const authRoute = require("./routes/auth.routes");

// Using the routes
app.use("/api/auth", authRoute);

module.exports = app;
