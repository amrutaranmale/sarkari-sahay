import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllSchemes(req, res) {
  try {
    const { category, level, state, search } = req.query;
    const where = { isActive: true };

    if (category) where.category = category;
    if (level) where.level = level;
    if (state) {
      where.OR = [
        { level: 'central' },
        { state: state.toLowerCase().replace(/\s+/g, '_') },
      ];
    }
    if (search) {
      where.OR = [
        ...(where.OR || []),
        { name: { contains: search } },
        { summary: { contains: search } },
      ];
    }

    const schemes = await prisma.scheme.findMany({
      where,
      orderBy: [{ level: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    console.error('getAllSchemes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch schemes' });
  }
}

export async function getSchemeBySlug(req, res) {
  try {
    const scheme = await prisma.scheme.findUnique({
      where: { slug: req.params.slug },
    });
    if (!scheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }
    res.json({ success: true, data: scheme });
  } catch (error) {
    console.error('getSchemeBySlug:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch scheme' });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await prisma.scheme.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category'],
    });
    res.json({
      success: true,
      data: categories.map((c) => c.category),
    });
  } catch (error) {
    console.error('getCategories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
}
