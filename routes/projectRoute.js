const { authentication, restrictTo } = require("../controllers/authController");
const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");
const router = require("express").Router();

router.route("/").post(authentication, restrictTo("1"), createProject);
router.get("/", authentication, getAllProjects);

module.exports = router;
