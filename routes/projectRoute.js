const { authentication, restrictTo } = require("../controllers/authController");
const {
  createProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/projectController");
const router = require("express").Router();

router
  .route("/")
  .post(authentication, restrictTo("1"), createProject)
  .get(authentication, getAllProjects);

router.route("/:id").get(authentication, getProjectById);

module.exports = router;
