const router = require("express").Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const adminMiddleware = require(
  "../middlewares/admin.middleware"
);


// Admin only route
router.get(
  "/overview",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

module.exports = router;