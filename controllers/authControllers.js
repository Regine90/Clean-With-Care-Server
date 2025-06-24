const bcrypt = require("bcrypt");
const User = require("../models/userModel"); 

// REGISTER Controller
const register = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: { message: "User already exists with this email." },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    await newUser.save();

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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: { message: "Invalid username or password." },
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({
        error: { message: "Invalid username or password." },
      });
    }

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

// LOGOUT Controller
const logout = async (req, res, next) => {
  res.clearCookie("connect.sid");
  return res.status(200).json({
    success: { message: "User logged out" },
  });
};

module.exports = { register, login, logout };
