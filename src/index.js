const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");



const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.NODE_ENV=="development"? process.env.MONGO_URI_DEV:process.env.MONGO_URI_PRO)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });