require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./routes/authRoute");

const app = express();

// * All routes
app.use("/api/v1/auth", authRouter);

// * If no other route matches, this route will match (404 route)
app.use("*", (req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "Not found",
  });
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});
