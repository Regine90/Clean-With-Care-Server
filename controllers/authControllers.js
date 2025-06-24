const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: { message: "User already exists with this email." },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: { message: "New user created successfully!" },
      data: { email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: { message: "Internal server error!" },
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: { message: "Invalid email or password." },
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({
        error: { message: "Invalid email or password." },
      });
    }

    return res.status(200).json({
      success: { message: "Login successful." },
      data: { email: user.email, firstName: user.firstName },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: { message: "Internal server error!" },
    });
  }
};
