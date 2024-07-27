const user = require("../db/models/user");
const jwt = require("jsonwebtoken");

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

module.exports = { signUp };
