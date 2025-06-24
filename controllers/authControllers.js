const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define User Schema (only once in your app)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true }, // email as username
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// REGISTER Controller
const register = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  console.log({ firstName, lastName, username, password });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: { message: "User already exists with this email." },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User successfully created");

    return res.status(201).json({
      success: { message: "New user created successfully!" },
      data: { username: newUser.username },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: { message: "Internal server error!" },
    });
  }
};

// LOGIN Controller
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by username (email)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: { message: "Invalid username or password." },
      });
    }

    // Compare passwords
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({
        error: { message: "Invalid username or password." },
      });
    }

    console.log("Login successful");

    return res.status(200).json({
      success: { message: "Login successful." },
      data: { username: user.username, firstName: user.firstName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: { message: "Internal server error!" },
    });
  }
};

// LOGOUT Controller (same as before)
const logout = async (req, res, next) => {
  console.log("Initializing logout controller logic...");
  res.clearCookie("connect.sid");
  function sessionDestruction(err) {
    if (err) {
      return next(err);
    }
  }
  sessionDestruction();
  console.log("Logout function activated. Logging out...");
  return res.status(200).json({
    success: { message: "User logged out" },
  });
};

// LOCAL LOGIN Stub
const localLogin = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "Local login successful." },
  });
};

module.exports = { register, login, logout, localLogin };
