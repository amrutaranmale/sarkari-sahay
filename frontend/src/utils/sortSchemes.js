export function sortSchemes(schemes, sortBy) {
  const list = [...schemes];
  switch (sortBy) {
    case 'benefit':
      return list.sort((a, b) => {
        const aNum = parseBenefit(a.benefitAmount);
        const bNum = parseBenefit(b.benefitAmount);
        return bNum - aNum;
      });
    case 'level':
      return list.sort((a, b) => {
        if (a.level === b.level) return a.name.localeCompare(b.name);
        return a.level === 'central' ? -1 : 1;
      });
    case 'category':
      return list.sort((a, b) => {
        const c = a.category.localeCompare(b.category);
        return c !== 0 ? c : a.name.localeCompare(b.name);
      });
    default:
      return list.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function parseBenefit(str) {
  if (!str) return 0;
  const match = str.replace(/,/g, '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
