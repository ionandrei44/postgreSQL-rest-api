const { Sequelize } = require("sequelize");
const user = require("../db/models/user");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (_, res) => {
  const users = await user.findAndCountAll({
    where: {
      userType: {
        [Sequelize.Op.ne]: "0",
      },
    },
    attributes: {
      exclude: ["password"],
    },
  });

  return res.status(200).json({
    status: "Success",
    data: users,
  });
});

module.exports = { getAllUsers };
