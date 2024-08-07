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
  const userId = req.user.id;
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, {
    include: user,
    where: { createdBy: userId },
  });

  if (!result) throw new AppError("Project not found", 400);

  return res.json({
    status: "Success",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;
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

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) throw new AppError("Invalid project id", 400);

  result.title = title;
  result.productImage = productImage;
  result.price = price;
  result.shortDescription = shortDescription;
  result.description = description;
  result.productUrl = productUrl;
  result.category = category;
  result.tags = tags;

  const updatedProject = await result.save();

  return res.status(200).json({
    status: "Success",
    data: updatedProject,
  });
}, []);

const deleteProject = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) throw new AppError("Invalid project id", 400);

  await result.destroy();

  return res.status(200).json({
    status: "Success",
    message: "Record deleted",
  });
}, []);

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
