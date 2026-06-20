import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import transactionRoutes
from "./routes/transaction.routes.js";

import logger from "./middlewares/logger.middleware.js";

import limiter from "./middlewares/rateLimiter.js";

import notFound
from "./middlewares/notFound.middleware.js";

import errorHandler
from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(logger);

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "Finance Tracker API Running",
  });
});

app.use("/auth", authRoutes);

app.use(
  "/transactions",
  transactionRoutes
);

app.use(notFound);

app.use(errorHandler);

export default app;