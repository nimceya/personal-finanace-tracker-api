const router = require("express").Router();

const {
  register,
  login,
  profile,
} = require("../controllers/auth.controller");

const authMiddleware = require(
  "../middlewares/auth.middleware"
);


// Public Routes
router.post("/register", register);
router.post("/login", login);


// Protected Route
router.get(
  "/profile",
  authMiddleware,
  profile
);

module.exports = router;