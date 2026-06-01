import { PrismaClient } from '@prisma/client';
import { findEligibleSchemes } from '../engine/eligibilityEngine.js';

const prisma = new PrismaClient();

const REQUIRED_FIELDS = [
  'state',
  'age',
  'incomeRange',
  'caste',
  'gender',
  'occupation',
  'disability',
];

export async function checkEligibility(req, res) {
  try {
    const profile = req.method === 'GET' ? req.query : req.body;

    const missing = REQUIRED_FIELDS.filter(
      (f) => profile[f] === undefined || profile[f] === ''
    );
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missing,
      });
    }

    const schemes = await prisma.scheme.findMany({
      where: { isActive: true },
    });

    const eligible = findEligibleSchemes(
      {
        state: profile.state,
        age: profile.age,
        incomeRange: profile.incomeRange,
        caste: profile.caste,
        gender: profile.gender,
        occupation: profile.occupation,
        disability: profile.disability === 'yes' || profile.disability === true,
      },
      schemes
    );

    res.json({
      success: true,
      profile: {
        state: profile.state,
        age: profile.age,
        incomeRange: profile.incomeRange,
        caste: profile.caste,
        gender: profile.gender,
        occupation: profile.occupation,
        disability: profile.disability,
      },
      count: eligible.length,
      data: eligible,
    });
  } catch (error) {
    console.error('checkEligibility:', error);
    res.status(500).json({ success: false, error: 'Eligibility check failed' });
  }
}
