const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
// This will allow our React frontend to communicate with this backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent in cross-origin requests
  }),
);

// Middleware to parse cookies
// This will allow us to read cookies from the request,
//  which is necessary for handling JWT tokens stored in cookies
app.use(cookieParser());

// Require all routes
const authRoute = require("./routes/auth.routes");

// Using the routes
app.use("/api/auth", authRoute);

module.exports = app;
