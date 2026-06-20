const router = require("express").Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const upload = require(
  "../middlewares/upload.middleware"
);

const {
  uploadProfilePicture,
} = require(
  "../controllers/upload.controller"
);


// Upload route
router.post(
  "/profile-picture",
  authMiddleware,
  upload.single("image"),
  uploadProfilePicture
);

module.exports = router;