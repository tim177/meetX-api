const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const userToken = signedToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", userToken, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    userToken,
    data: {
      user,
    },
  });
};

//REGISTER the user
exports.register = async function (req, res, next) {
  const { userName, email, password } = req.body;

  const newUser = await User.create({ userName, email, password });

  createSendToken(newUser, 200, res);
};

//LOG-IN the user
exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failure",
        message: "Please provide email and password!",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    // 3) If user doesn't exist or password doesn't match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid email or password",
      });
    }

    // 4) If everything is ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//LOGOUT the user
exports.logout = function (req, res, next) {
  res.cookie("jwt", "logout", {
    expires: new Date(new Date() + 10 * 10),
    httpOnly: true,
  });
  res.status(200).json({ status: "success", message: "logged out the user" });
};

//PROTECT the route
//TODO: Change this again
exports.protect = async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "failure",
      message: "You are not logged in. Please log in to get access",
    });
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    res.status(401).json({
      status: "failure",
      message: "The user does no longer exist",
    });
  }

  req.user = currentUser;

  next();
};
