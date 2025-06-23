const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user_roles.createMany({
    data: [
      {
        id: 1,
        name: "admin",
        description: null,
      },
      {
        id: 2,
        name: "user",
        description: null,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.companies.createMany({
    data: [
      {
        id: 1,
        name: "EcuadorTech S.A.",
        address: "Av. Amazonas 1345, Quito",
      },
      {
        id: 2,
        name: "Andes Soluciones",
        address: "Calle Chile y Aguirre, Guayaquil",
      },
      {
        id: 3,
        name: "Control Climático Loja",
        address: "Av. Universitaria y Av. Manuel Agustín Aguirre, Loja",
      },
      {
        id: 4,
        name: "Innovaciones Tungurahua",
        address: "Av. Cevallos y Montalvo, Ambato",
      },
      {
        id: 5,
        name: "ClimaSmart S.A.",
        address: "Av. Remigio Crespo y Cornelio Merchán, Cuenca",
      },
      {
        id: 6,
        name: "SensorData Ecuador",
        address: "Av. 6 de Diciembre y Naciones Unidas, Quito",
      },
      {
        id: 7,
        name: "ElectroCloud Systems",
        address: "Malecón Simón Bolívar y 9 de Octubre, Guayaquil",
      },
      {
        id: 8,
        name: "Carchi Electrónica",
        address: "Av. Bolívar y Av. Carchi, Tulcán",
      },
      {
        id: 9,
        name: "IoT Solutions Riobamba",
        address: "Av. Daniel León Borja y Av. de los Shyris, Riobamba",
      },
      {
        id: 10,
        name: "Ambiente Inteligente",
        address: "Av. 10 de Agosto y Av. El Inca, Quito",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.users.createMany({
    data: [
      {
        id: 1,
        name: "admin-dev",
        email: "admin@email.com",
        password:
          "$2y$10$K3Pfj0CiBqukj0qtIsQLA./2SZLG5Z94cg9pNhuUTvXcPXa0m/uM6",
        user_role_id: 1,
        company_id: null,
      },
      {
        id: 2,
        name: "user-dev",
        email: "user@email.com",
        password:
          "$2y$10$ya31jyNfYQnDSu1qUVII.exGNT05GBf773lXrwk7JCLVYvfw9zStq",
        user_role_id: 2,
        company_id: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
