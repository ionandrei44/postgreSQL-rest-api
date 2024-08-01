const { createProject } = require("../controllers/projectController");
const router = require("express").Router();

router.route("/").post(createProject);

module.exports = router;
