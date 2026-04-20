const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: true,
  },

  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// Create the User model using the schema
// This will create a collection named "users" in the MongoDB database
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
