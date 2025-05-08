const jwt = require("jsonwebtoken");

const signedToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
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
