import { CATEGORIES } from '../utils/formatters';
import { CATEGORY_ICONS } from '../utils/icons';

export default function CategoryBadge({ category, showIcon = true }) {
  const meta = CATEGORIES[category] || {
    label: category,
    color: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.color}`}
    >
      {showIcon && <span>{CATEGORY_ICONS[category] || '📌'}</span>}
      {meta.label}
    </span>
  );
}
