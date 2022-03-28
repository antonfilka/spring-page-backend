const Router = require("express").Router;
const userController = require("./../controller/UserController");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);
router.get("/projects");
router.get("/projects/:text");

module.exports = router;
