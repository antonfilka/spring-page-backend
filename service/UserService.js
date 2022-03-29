const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const tokenService = require("./TokenService");
const UserDto = require("./../dtos/UserDto");
const ApiError = require("../exceptions/ApiError");
const { use } = require("bcrypt/promises");

const prisma = new PrismaClient();

class UserService {
  async registration(username, password, firstName, lastName, age) {
    const candidate = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (candidate) {
      throw ApiError.Badrequest(
        `User with username '${username}' already exists`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await prisma.users.create({
      data: {
        username: username,
        hashPassword: hashPassword,
        firstName: firstName,
        lastName: lastName,
        age: age,
        refreshToken: "",
      },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(username, password) {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw ApiError.Badrequest(
        `User with username '${username}' doesn't exist.`
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.hashPassword);
    if (!isPassEquals) {
      throw ApiError.Badrequest("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await prisma.users.findUnique({
      where: {
        userId: userData.userId,
      },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }
}

module.exports = new UserService();
