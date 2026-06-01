/**
 * Core eligibility matching engine.
 * Evaluates user profile against scheme criteria.
 */

const INCOME_BRACKETS = {
  below_1l: { min: 0, max: 100000 },
  '1l_2.5l': { min: 100001, max: 250000 },
  '2.5l_5l': { min: 250001, max: 500000 },
  '5l_10l': { min: 500001, max: 1000000 },
  above_10l: { min: 1000001, max: Infinity },
};

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return [];
}

function matchesArray(allowed, userValue) {
  const list = asArray(allowed);
  if (!list || list.length === 0) return true;
  const normalized = list.map(normalize);
  if (normalized.includes('all')) return true;
  return normalized.includes(normalize(userValue));
}

function matchesAge(scheme, age) {
  const userAge = parseInt(age, 10);
  if (isNaN(userAge)) return false;
  if (scheme.minAge != null && userAge < scheme.minAge) return false;
  if (scheme.maxAge != null && userAge > scheme.maxAge) return false;
  return true;
}

function matchesIncome(scheme, incomeRange) {
  const bracket = INCOME_BRACKETS[incomeRange];
  if (!bracket) return true;

  // Scheme has no income limits
  if (scheme.minIncome == null && scheme.maxIncome == null) return true;

  const schemeMin = scheme.minIncome ?? 0;
  const schemeMax = scheme.maxIncome ?? Infinity;

  // User's income bracket overlaps scheme eligibility window
  return bracket.max >= schemeMin && bracket.min <= schemeMax;
}

function matchesState(scheme, userState) {
  if (scheme.level === 'central') return true;
  if (!scheme.state) return true;
  return normalize(scheme.state) === normalize(userState);
}

function matchesDisability(scheme, hasDisability) {
  if (!scheme.disabilityRequired) return true;
  return hasDisability === true || hasDisability === 'yes';
}

/**
 * @param {object} profile - User eligibility profile
 * @param {object[]} schemes - All active schemes from DB
 * @returns {object[]} Eligible schemes with match metadata
 */
export function findEligibleSchemes(profile, schemes) {
  const {
    state,
    age,
    incomeRange,
    caste,
    gender,
    occupation,
    disability,
  } = profile;

  return schemes
    .filter((scheme) => {
      if (!scheme.isActive) return false;
      if (!matchesState(scheme, state)) return false;
      if (!matchesAge(scheme, age)) return false;
      if (!matchesIncome(scheme, incomeRange)) return false;
      if (!matchesArray(scheme.castes, caste)) return false;
      if (!matchesArray(scheme.genders, gender)) return false;
      if (!matchesArray(scheme.occupations, occupation)) return false;
      if (!matchesDisability(scheme, disability)) return false;
      return true;
    })
    .map((scheme) => ({
      ...scheme,
      matchReasons: buildMatchReasons(scheme, profile),
    }));
}

function buildMatchReasons(scheme, profile) {
  const reasons = [];
  if (scheme.level === 'central') reasons.push('Central government scheme');
  else if (scheme.state) reasons.push(`State scheme for ${scheme.state}`);

  if (scheme.minAge != null || scheme.maxAge != null) {
    const parts = [];
    if (scheme.minAge != null) parts.push(`${scheme.minAge}+`);
    if (scheme.maxAge != null) parts.push(`up to ${scheme.maxAge}`);
    reasons.push(`Age: ${parts.join(', ')}`);
  }

  const castes = asArray(scheme.castes);
  if (castes.length && !castes.includes('all')) {
    reasons.push(`Category: ${castes.join(', ').toUpperCase()}`);
  }

  if (scheme.disabilityRequired) reasons.push('Disability support');
  const genders = asArray(scheme.genders);
  if (genders.length && !genders.includes('all')) {
    reasons.push(`Gender: ${genders.join(', ')}`);
  }

  return reasons;
}

export { INCOME_BRACKETS };
