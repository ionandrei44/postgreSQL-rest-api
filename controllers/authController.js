const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = catchAsync(async (req, res) => {
  const { userType, firstName, lastName, email, password, confirmPassword } =
    req.body;

  if (!["1", "2"].includes(userType)) {
    throw new AppError("Invalid user type", 400);
  }

  const newUser = await user.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  if (!newUser) {
    throw new AppError("Failed to create user", 400);
  }

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "Success",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const result = await user.findOne({ where: { email } });
  const passwordsMatch = await bcrypt.compare(password, result?.password ?? "");

  if (!result || !passwordsMatch) {
    throw new AppError("Incorrect email or password", 401);
  }

  const token = generateToken({
    id: result.id,
  });

  return res.status(200).json({
    status: "Success",
    token,
  });
});

module.exports = { signUp, login };
