const Transaction = require(
  "../models/transaction.model"
);


// CREATE TRANSACTION
const createTransaction = async (req, res) => {
  try {

    const {
      title,
      amount,
      type,
      category,
    } = req.body;

    const transaction =
      await Transaction.create({
        title,
        amount,
        type,
        category,
        user: req.user._id,
      });

    res.status(201).json({
      message: "Transaction created",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER TRANSACTIONS
const getTransactions = async (req, res) => {
  try {

    const transactions =
      await Transaction.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    res.status(200).json({
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TRANSACTION
const updateTransaction = async (req, res) => {
  try {

    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      message: "Transaction updated",
      updatedTransaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE TRANSACTION
const deleteTransaction = async (req, res) => {
  try {

    const transaction =
      await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// MONTHLY SUMMARY
const monthlySummary = async (req, res) => {
  try {

    const summary =
      await Transaction.aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },

        {
          $group: {
            _id: {
              category: "$category",
              type: "$type",
            },

            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    res.status(200).json({
      summary,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  monthlySummary,
};