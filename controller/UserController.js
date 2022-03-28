const { PrismaClient } = require("@prisma/client");
const userService = require("./../service/UserService");
const prisma = new PrismaClient();

class UserController {
  async registration(req, res, next) {
    try {
      const { username, password, firstName, lastName, age } = req.body;
      const userData = await userService.registration(
        username,
        password,
        firstName,
        lastName,
        age
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {}
  }

  async logout(req, res, next) {
    try {
    } catch (e) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123"]);
    } catch (e) {}
  }
}

module.exports = new UserController();
