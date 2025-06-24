const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// REGISTER Controller
const register = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: { message: "User already exists." } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "New user created successfully!",
      user: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { message: "Internal server error." } });
  }
};

// LOGIN Controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ error: { message: "Invalid username or password." } });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(400)
        .json({ error: { message: "Invalid username or password." } });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: { message: "Internal server error." } });
  }
};

// LOGOUT Controller (optional for future session handling)
const logout = async (req, res) => {
  res.clearCookie("connect.sid");
  return res.status(200).json({ message: "User logged out." });
};

module.exports = { register, login, logout };
