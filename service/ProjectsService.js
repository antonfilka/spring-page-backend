const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProjectsService {
  async setProjects(data) {
    const projectsData = await prisma.springProjects.createMany({
      data,
    });
    return projectsData;
  }

  async getAllProjects() {
    const projectsData = await prisma.springProjects.findMany();
    return projectsData;
  }
}

module.exports = new ProjectsService();
