const catchAsync = require("../utils/catchAsync");
const project = require("../db/models/project");
const user = require("../db/models/user");
const AppError = require("../utils/appError");

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

const getAllProjects = catchAsync(async (_, res) => {
  const result = await project.findAll({ include: user });

  return res.json({
    status: "Success",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, { include: user });

  if (!result) throw new AppError("Project not found", 400);

  return res.json({
    status: "Success",
    data: result,
  });
});

module.exports = { createProject, getAllProjects, getProjectById };
