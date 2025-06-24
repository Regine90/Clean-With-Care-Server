const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, minLength: 8 },
  googleId: { type: String },
  githubId: { type: String },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
