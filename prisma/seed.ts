import { PrismaClient } from "@prisma/client";
import { perkSeedList } from "./perk";

const prisma = new PrismaClient();

async function main() {
  await prisma.perk.createMany({
    data: perkSeedList,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
