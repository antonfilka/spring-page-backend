const projectsService = require("../service/ProjectsService");

class ProjectsController {
  async addProjects(req, res, next) {
    try {
      const projectsToSet = req.body;
      const projects = await projectsService.setProjects(projectsToSet);
      res.json(projects);
    } catch (e) {
      next(e);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await projectsService.getAllProjects();
      res.json(projects);
    } catch (e) {
      next(e);
    }
  }

  async getSomeProjects(req, res, next) {
    try {
      const searchString = req.params.text.toLowerCase();
      const allPojects = await projectsService.getAllProjects();
      const projects = allPojects.filter(
        (card) =>
          card.title.toLowerCase().includes(searchString) ||
          card.text.toLowerCase().includes(searchString)
      );

      res.json(projects);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProjectsController();
