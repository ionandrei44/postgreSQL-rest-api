const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = async (req, res) => {
  const { userType, firstName, lastName, email, password, confirmPassword } =
    req.body;

  if (!["1", "2"].includes(userType)) {
    return res.status(400).json({
      status: "Fail",
      message: "Invalid user type",
    });
  }

  const newUser = await user.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  const result = newUser.toJSON();

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return res.status(400).json({
      status: "Fail",
      message: "Failed to create user",
    });
  }

  return res.status(201).json({
    status: "Success",
    data: result,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Fail",
      message: "Email and password are required",
    });
  }

  const result = await user.findOne({ where: { email } });

  if (!result) {
    return res.status(401).json({
      status: "Fail",
      message: "Incorrect email and password",
    });
  }

  const passwordsMatch = await bcrypt.compare(password, result.password);

  if (!passwordsMatch) {
    return res.status(401).json({
      status: "Fail",
      message: "Incorrect email and password",
    });
  }

  const token = generateToken({
    id: result.id,
  });

  return res.status(200).json({
    status: "Success",
    token,
  });
};

module.exports = { signUp, login };
