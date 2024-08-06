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
  const userId = req.user.id;

  const newProject = await project.create({
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy: userId,
  });

  return res.status(201).json({
    status: "Success",
    data: newProject,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await project.findAll();

  return res.json({
    status: "Success",
    data: result,
  });
});

module.exports = { createProject, getAllProjects };
