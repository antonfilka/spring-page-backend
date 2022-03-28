const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const tokenService = require("./TokenService");
const UserDto = require("./../dtos/UserDto");

const prisma = new PrismaClient();

class UserService {
  async registration(username, password, firstName, lastName, age) {
    const candidate = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (candidate) {
      throw new Error(`User with username '${username}' already exists`);
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
}

module.exports = new UserService();
