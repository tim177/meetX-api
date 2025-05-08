const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { createSendToken } = require("../utils/tokenUtils");

//REGISTER the user
exports.register = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "failure",
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { userName, email, password } = req.body;

    //check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: "failure",
        message: "Email already in use",
      });
    }

    const newUser = await User.create({ userName, email, password });
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Error registering user",
    });
  }
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
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "failure",
        message: "You are not logged in. Please log in to get access",
      });
    }

    //verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "failure",
        message: "The user belonging to this token no longer exists",
      });
    }

    //Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid token. Please log in again",
    });
  }
};
