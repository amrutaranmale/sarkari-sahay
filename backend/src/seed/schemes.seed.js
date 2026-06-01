import { PrismaClient } from '@prisma/client';
import { centralSchemes } from './data/central.schemes.js';
import { stateSchemes } from './data/state.schemes.js';

const prisma = new PrismaClient();

const schemes = [...centralSchemes, ...stateSchemes];

async function main() {
  console.log('Seeding schemes...');
  console.log(`  Central: ${centralSchemes.length}`);
  console.log(`  State:   ${stateSchemes.length}`);
  console.log(`  Total:   ${schemes.length}`);

  let created = 0;
  let updated = 0;

  for (const scheme of schemes) {
    const existing = await prisma.scheme.findUnique({ where: { slug: scheme.slug } });
    await prisma.scheme.upsert({
      where: { slug: scheme.slug },
      update: scheme,
      create: scheme,
    });
    if (existing) updated++;
    else created++;
  }

  console.log(`Done. ${created} created, ${updated} updated (${schemes.length} total).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
