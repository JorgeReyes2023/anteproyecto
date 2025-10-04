const { NodeService } = require("../src/services/node.service");
const { NodeModel } = require("../src/models/node.model");
const { State } = require("../src/constants/states");
const {
  nodeSchema,
  nodeSchemaId,
} = require("../src/validators/node.validator");
const { sensors, projects } = require("../src/prisma");

jest.mock("../src/models/node.model");
jest.mock("../src/validators/node.validator");

describe("NodeService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNode", () => {
    it("should create a node and return it with formatted status", async () => {
      nodeSchema.validate.mockReturnValue({
        value: {
          name: "N1",
          location: "Quito",
          status: "ONLINE",
          projectId: 1,
        },
      });
      NodeModel.createNode.mockResolvedValue({
        n_id: 1,
        n_nombre: "N1",
        n_ubicacion: "Quito",
        n_estado: "ONLINE",
        n_proyecto_id: 1,
        proyectos: null,
        sensores: [],
      });

      const result = await NodeService.createNode("N1", "Quito", "ONLINE", 1);
      expect(result).toEqual({
        id: 1,
        name: "N1",
        location: "Quito",
        status: State.ONLINE,
        projectId: 1,
        proyectos: null,
        sensores: [],
      });
    });

    it("should throw validation error", async () => {
      nodeSchema.validate.mockReturnValue({ error: new Error("invalid data") });
      await expect(NodeService.createNode("", "", "", null)).rejects.toThrow(
        "Error de validación: invalid data",
      );
    });
  });

  describe("getNodeById", () => {
    it("should return node by id with formatted status", async () => {
      nodeSchemaId.validate.mockReturnValue({ value: { id: 1 } });
      NodeModel.getNodeById.mockResolvedValue({
        n_id: 1,
        n_nombre: "NodeX",
        n_ubicacion: "Quito",
        n_estado: "ACTIVO",
        n_proyecto_id: 4,
        proyectos: { p_id: 4, p_nombre: "P1" },
        sensores: [],
      });

      const result = await NodeService.getNodeById(1);
      expect(result).toEqual({
        id: 1,
        name: "NodeX",
        location: "Quito",
        status: "activo",
        projectId: 4,
        project: { p_id: 4, p_nombre: "P1" },
        sensors: [],
      });
    });

    it("should return node with empty project array if projects is undefined", async () => {
      const mockNode = {
        n_id: 1,
        n_nombre: "Node A",
        n_ubicacion: "Loja",
        n_proyecto_id: 101,
        proyectos: undefined, // simulate no project linked
        n_estado: "INACTIVO",
        sensores: [],
      };

      NodeModel.getNodeById.mockResolvedValue(mockNode);

      const result = await NodeService.getNodeById(1);

      expect(result).toEqual({
        id: 1,
        name: "Node A",
        location: "Loja",
        status: "inactivo",
        projectId: 101,
        project: null,
        sensors: [],
      });
    });

    it("should throw validation error", async () => {
      nodeSchemaId.validate.mockReturnValue({ error: new Error("bad id") });
      await expect(NodeService.getNodeById(null)).rejects.toThrow(
        "Error de validación: bad id",
      );
    });
  });

  describe("updateNode", () => {
    it("should update and return the node", async () => {
      nodeSchema.validate.mockReturnValue({
        value: {
          id: 2,
          name: "Updated",
          location: "Loja",
          status: "MANTENIMIENTO",
          projectId: 3,
        },
      });
      NodeModel.updateNode.mockResolvedValue({
        n_id: 2,
        n_nombre: "Updated",
        n_ubicacion: "Loja",
        n_estado: "MANTENIMIENTO",
        n_proyecto_id: 3,
        proyectos: null,
        sensores: [],
      });

      const result = await NodeService.updateNode(
        2,
        "Updated",
        "Loja",
        "MANTENIMIENTO",
        3,
      );

      expect(result).toEqual({
        id: 2,
        name: "Updated",
        location: "Loja",
        status: State.MANTENIMIENTO,
        projectId: 3,
        project: null,
        sensors: [],
      });
    });

    it("should throw validation error on bad input", async () => {
      nodeSchema.validate.mockReturnValue({ error: new Error("bad input") });
      await expect(NodeService.updateNode("", "", "", "", "")).rejects.toThrow(
        "Error de validación: bad input",
      );
    });
  });

  describe("deleteNode", () => {
    it("should delete a node", async () => {
      nodeSchemaId.validate.mockReturnValue({ value: { id: 5 } });
      NodeModel.deleteNode.mockResolvedValue({ message: "Deleted" });

      const result = await NodeService.deleteNode(5);
      expect(result).toEqual({ message: "Deleted" });
    });

    it("should throw if validation fails", async () => {
      nodeSchemaId.validate.mockReturnValue({ error: new Error("invalid ID") });
      await expect(NodeService.deleteNode(null)).rejects.toThrow(
        "Error de validación: invalid ID",
      );
    });
  });

  describe("getAllNodes", () => {
    it("should return all nodes formatted", async () => {
      NodeModel.getAllNodes.mockResolvedValue([
        {
          n_id: 1,
          n_nombre: "N1",
          n_ubicacion: "Quito",
          n_estado: "ACTIVO",
          sensores: [],
          n_proyecto_id: 2,
          proyectos: null,
        },
        {
          n_id: 2,
          n_nombre: "N2",
          n_ubicacion: "Loja",
          n_estado: "INACTIVO",
          sensores: [],
          n_proyecto_id: 3,
          proyectos: null,
        },
      ]);

      const result = await NodeService.getAllNodes();

      expect(result).toEqual([
        {
          id: 1,
          name: "N1",
          location: "Quito",
          status: State.ACTIVO,
          projectId: 2,
          project: null,
          sensors: [],
        },
        {
          id: 2,
          name: "N2",
          location: "Loja",
          status: State.INACTIVO,
          projectId: 3,
          project: null,
          sensors: [],
        },
      ]);
    });

    it("should throw on DB error", async () => {
      NodeModel.getAllNodes.mockRejectedValue(new Error("connection lost"));
      await expect(NodeService.getAllNodes()).rejects.toThrow(
        "Error al obtener los nodos: connection lost",
      );
    });
  });
});
