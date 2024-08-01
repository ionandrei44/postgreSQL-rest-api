require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./routes/authRoute");
const projectRouter = require("./routes/projectRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// * Middleware to parse incoming JSON requests
app.use(express.json());

// * All routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);

// * If no other route matches, this route will match (404 route)

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});
