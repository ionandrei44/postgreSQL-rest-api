const { authentication } = require("../controllers/authController");
const { createProject } = require("../controllers/projectController");
const router = require("express").Router();

router.route("/").post(authentication, createProject);

module.exports = router;
