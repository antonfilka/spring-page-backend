const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1h",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    // const tokenData = await prisma.users.findUnique({
    //   where: {
    //     userId: userId,
    //   },
    // });

    const token = await prisma.users.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    return token;
  }

  async removeToken(refreshToken) {
    const user = await prisma.users.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });

    const tokenData = await prisma.users.update({
      where: {
        userId: user.userId,
      },
      data: {
        refreshToken: " ",
      },
    });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await prisma.users.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
