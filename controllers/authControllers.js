const register = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  console.log({ firstName, lastName, username, password });

  try {
    const newUser = {
      firstName,
      lastName,
      username,
      password,
    };
    console.log("code is operational");
    return res.status(201).json({
      success: { message: "New user is created!" },
      data: { newUser },
    });
  } catch (error) {
    return res.status(500).json({
      error: { message: "Internal server error!" },
    });
  }
};

const login = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "User logged in." },
  });
};

const logout = async (req, res, next) => {
  console.log("Initializing logout controller logic...");

  res.clearCookie("connect.sid");

  function sessionDestruction(err) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  sessionDestruction();
  console.log("Logout function activated. Logging out...");

  return res.status(200).json({
    success: { message: "User logging out" },
    statusCode: 200,
  });
};

const localLogin = async (req, res, next) => {
  let result = true;

  function mockPassport(err, user) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  //call the mockPassport feature
  mockPassport();

  return res.status(200).json({
    success: { message: "Login successful." },
    result: result,
  });
};

module.exports = { register, login, logout, localLogin };
