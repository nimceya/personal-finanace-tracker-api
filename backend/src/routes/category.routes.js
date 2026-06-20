const router = require("express").Router();


// Static categories
const categories = [
  "Food",
  "Salary",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
];


// GET categories
router.get("/", (req, res) => {
  res.status(200).json({
    categories,
  });
});

module.exports = router;