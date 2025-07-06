const { ProjectService } = require("../src/services/project.service");
const { ProjectModel } = require("../src/models/project.model");
const {
  projectSchema,
  deleteProjectSchema,
} = require("../src/validators/project.validator");

jest.mock("../src/models/project.model");
jest.mock("../src/validators/project.validator");

describe("ProjectService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createProject", () => {
    it("should create a new project", async () => {
      projectSchema.validate.mockReturnValue({
        value: { name: "P1", description: "desc", companyId: 1, nodes: [] },
      });
      ProjectModel.getProjectByName.mockResolvedValue(null);
      ProjectModel.createProject.mockResolvedValue({ id: 1, name: "P1" });

      const result = await ProjectService.createProject("P1", "desc", 1, []);
      expect(result).toEqual({ id: 1, name: "P1" });
    });

    it("should throw if project exists", async () => {
      projectSchema.validate.mockReturnValue({
        value: { name: "P1", description: "desc", companyId: 1, nodes: [] },
      });
      ProjectModel.getProjectByName.mockResolvedValue({ id: 1 });

      await expect(
        ProjectService.createProject("P1", "desc", 1, []),
      ).rejects.toThrow("El proyecto con el nombre P1 ya existe");
    });
  });

  describe("updateProject", () => {
    it("should update a project", async () => {
      projectSchema.validate.mockReturnValue({
        value: {
          id: 1,
          name: "P2",
          description: "desc",
          companyId: 1,
          nodes: [],
        },
      });
      ProjectModel.updateProject.mockResolvedValue({ id: 1, name: "P2" });

      const result = await ProjectService.updateProject(1, "P2", "desc", 1, []);
      expect(result).toEqual({ id: 1, name: "P2" });
    });
  });

  describe("deleteProject", () => {
    it("should delete a project", async () => {
      deleteProjectSchema.validate.mockReturnValue({ value: { id: 1 } });
      ProjectModel.deleteProject.mockResolvedValue(true);

      const result = await ProjectService.deleteProject(1);
      expect(result).toBe(true);
    });
  });

  describe("getAllProjects", () => {
    it("should return formatted project list", async () => {
      ProjectModel.getAllProjects.mockResolvedValue([
        {
          id: 1,
          name: "P1",
          description: "test",
          company_id: 5,
          nodes: [],
          companies: {
            id: 5,
            name: "TestCompany",
          },
        },
      ]);

      const result = await ProjectService.getAllProjects();
      expect(result).toEqual([
        {
          id: 1,
          name: "P1",
          description: "test",
          companyId: 5,
          nodes: [],
          company: {
            id: 5,
            name: "TestCompany",
          },
        },
      ]);
    });
  });
});
