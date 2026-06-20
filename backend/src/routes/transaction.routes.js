import express from "express";

import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  monthlySummary,
} from "../controllers/transaction.controller.js";

import { transactionSchema } from "../schemas/transaction.schema.js";

const router = express.Router();

router.post(
  "/",
  protect,
  validate(transactionSchema),
  createTransaction
);

router.get("/", protect, getTransactions);

router.put("/:id", protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);

router.get(
  "/monthly-summary",
  protect,
  monthlySummary
);

export default router;