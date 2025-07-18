const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Prevent OverwriteModelError:
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
