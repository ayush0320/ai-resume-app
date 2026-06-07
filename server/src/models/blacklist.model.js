const mongoose = require("mongoose");

// Define the schema for blacklisted tokens
// This schema will store tokens that have been invalidated (e.g., on logout)
const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  {
    timestamps: true,
  },
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
