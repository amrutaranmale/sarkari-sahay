import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStats(_req, res) {
  try {
    const [total, central, state, categories] = await Promise.all([
      prisma.scheme.count({ where: { isActive: true } }),
      prisma.scheme.count({ where: { isActive: true, level: 'central' } }),
      prisma.scheme.count({ where: { isActive: true, level: 'state' } }),
      prisma.scheme.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ['category'],
      }),
    ]);

    const statesCovered = await prisma.scheme.findMany({
      where: { isActive: true, level: 'state', state: { not: null } },
      select: { state: true },
      distinct: ['state'],
    });

    res.json({
      success: true,
      data: {
        totalSchemes: total,
        centralSchemes: central,
        stateSchemes: state,
        categories: categories.length,
        statesCovered: statesCovered.length,
      },
    });
  } catch (error) {
    console.error('getStats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
}
