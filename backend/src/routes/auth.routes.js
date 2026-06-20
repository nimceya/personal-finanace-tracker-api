import express from "express";

import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";

import protect from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../schemas/auth.schema.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/profile",
  protect,
  getProfile
);

export default router;