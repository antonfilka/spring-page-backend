const Router = require("express").Router;
const userController = require("./../controller/UserController");
const projectsController = require("./../controller/ProjectsController");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const ApiError = require("../exceptions/ApiError");
const router = new Router();

router.post(
  "/registration",
  body("username", "Username must contain at least 3 symbols").isLength({
    min: 3,
  }),
  body("password", "Password must contain at least 4 symbols")
    .isLength({
      min: 4,
    })
    .matches(/\d/)
    .withMessage("must contain a number")
    .matches(/[a-zA-Z]/)
    .withMessage("must contain a letter"),
  body("confirmPassword", "Passwords don't match").custom(
    (value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }
  ),
  body("firstName", "First name must contain at least 3 symbols").isLength({
    min: 3,
  }),
  body("lastName", "Last name must contain at least 3 symbols").isLength({
    min: 3,
  }),
  body("age", "Age should be numeric and grater then 0").isInt({ min: 1 }),
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
