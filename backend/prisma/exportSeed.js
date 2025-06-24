const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const { sensor_reading_types, nodes, thresholds } = require("../src/prisma");
const prisma = new PrismaClient();

async function main() {
  const tables = {
    sensor_reading_types: await prisma.sensor_reading_types.findMany(),
    companies: await prisma.companies.findMany(),
    user_roles: await prisma.user_roles.findMany(),
    users: await prisma.users.findMany(),
    nodes: await prisma.nodes.findMany(),
    sensors: await prisma.sensors.findMany(),
    sensor_readings: await prisma.sensor_readings.findMany(),
    sensor_reading_types: await prisma.sensor_reading_types.findMany(),
    nodes: await prisma.nodes.findMany(),
    thresholds: await prisma.thresholds.findMany(),
  };

  const lines = [];

  lines.push(`const { PrismaClient } = require('@prisma/client');`);
  lines.push(`const prisma = new PrismaClient();\n`);
  lines.push(`async function main() {`);

  for (const [table, rows] of Object.entries(tables)) {
    if (rows.length === 0) continue;
    lines.push(`  await prisma.${table}.createMany({`);
    lines.push(`    data: ${JSON.stringify(rows, null, 4)},`);
    lines.push(`    skipDuplicates: true`);
    lines.push(`  });\n`);
  }

  lines.push(`  console.log("✅");`);
  lines.push(`}\n`);
  lines.push(
    `main().catch(console.error).finally(() => prisma.$disconnect());`,
  );

  fs.writeFileSync("prisma/seed.js", lines.join("\n"));
  console.log("📦 seed.js generate/");
}

main();
