const router = require("express").Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);
const validate = require(
  "../middlewares/validate.middleware"
);

const transactionSchema = require(
  "../validators/transaction.validator"
);


const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  monthlySummary,
} = require(
  "../controllers/transaction.controller"
);


// Create
router.post(
  "/",
  authMiddleware,
  createTransaction
);
router.post(
  "/",
  authMiddleware,
  validate(transactionSchema),
  createTransaction
);


// Get all
router.get(
  "/",
  authMiddleware,
  getTransactions
);


// Monthly summary
router.get(
  "/monthly-summary",
  authMiddleware,
  monthlySummary
);


// Update
router.put(
  "/:id",
  authMiddleware,
  updateTransaction
);


// Delete
router.delete(
  "/:id",
  authMiddleware,
  deleteTransaction
);

module.exports = router;