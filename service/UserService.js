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
      },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await prisma.users.update({
      where: {
        userId: userDto.userId,
      },
      data: {
        isauth: 1,
      },
    });

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

    await prisma.users.update({
      where: {
        userId: userDto.userId,
      },
      data: {
        isauth: 1,
      },
    });

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const user = tokenService.validateRefreshToken(refreshToken);
    const userData = await prisma.users.update({
      where: {
        userId: user.userId,
      },
      data: {
        isauth: 0,
      },
    });
    return userData;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await prisma.users.findUnique({
      where: {
        userId: userData.userId,
      },
    });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await prisma.users.findMany();
    return users;
  }
}

module.exports = new UserService();
