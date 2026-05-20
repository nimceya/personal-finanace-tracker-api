const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // Check bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;