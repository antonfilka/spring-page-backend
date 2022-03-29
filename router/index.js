const Router = require("express").Router;
const userController = require("./../controller/UserController");
const projectsController = require("./../controller/ProjectsController");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const router = new Router();

router.post(
  "/registration",
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 4 }),
  body("firstName").isLength({ min: 3 }),
  body("lastName").isLength({ min: 3 }),
  body("age").isNumeric(),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/setprojects", projectsController.addProjects);
router.get("/projects", authMiddleware, projectsController.getAllProjects);
router.get(
  "/projects/:text",
  authMiddleware,
  projectsController.getSomeProjects
);

module.exports = router;
