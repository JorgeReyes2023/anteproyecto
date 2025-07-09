const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function main() {
  // Orden correcto de las tablas, respetando las dependencias entre ellas
  const tablesOrder = [
    "companies",
    "projects",
    "nodes",
    "sensor_reading_types",
    "user_roles",
    "users",
    "sensors",
    "sensor_readings",
    "thresholds",
    "alerts",
    "sensor_supported_types"
  ];

  const tables = {};

  //  Extraemos los datos actuales de la base de datos y eliminamos los campos id / created_at
  for (const table of tablesOrder) {
    const rows = await prisma[table].findMany();
    tables[table] = rows.map(({ id, created_at, ...rest }) => rest);
  }

  const lines = [];

  //  Cabecera del archivo seed.js
  lines.push(`const { PrismaClient } = require('@prisma/client');`);
  lines.push(`const prisma = new PrismaClient();\n`);
  lines.push(`async function main() {`);

  //  Insertamos los datos extraídos
  lines.push(`\n  // Inserción de datos`);
  for (const [table, rows] of Object.entries(tables)) {
    if (!rows || rows.length === 0) continue;
    lines.push(`  await prisma.${table}.createMany({`);
    lines.push(`    data: ${JSON.stringify(rows, null, 4)},`);
    lines.push(`    skipDuplicates: true`);
    lines.push(`  });\n`);
  }

  // Mensaje de éxito
  lines.push(`  console.log("Base de datos reinicializada con éxito");`);
  lines.push(`}\n`);
  lines.push(
    `main().catch(console.error).finally(() => prisma.$disconnect());`,
  );

  // Escribimos el archivo
  fs.writeFileSync("prisma/seed.js", lines.join("\n"));
  console.log("Archivo seed.js generado con eliminación automática incluida");
}

main();
