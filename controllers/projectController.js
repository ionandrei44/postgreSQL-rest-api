const catchAsync = require("../utils/catchAsync");
const project = require("../db/models/project");

const createProject = catchAsync(async (req, res) => {
  const {
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
  } = req.body;

  const newProject = await project.create({
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy: 1,
  });

  return res.status(201).json({
    status: "Success",
    data: newProject,
  });
});

module.exports = { createProject };
