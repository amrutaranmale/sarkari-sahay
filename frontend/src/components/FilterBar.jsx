import { CATEGORIES } from '../utils/formatters';
import { CATEGORY_ICONS } from '../utils/icons';

export default function FilterBar({ filters, onChange }) {
  const categoryOptions = Object.entries(CATEGORIES).map(([value, { label }]) => ({
    value,
    label,
  }));

  return (
    <div className="flex flex-1 flex-wrap gap-3 rounded-2xl border border-navy/8 bg-white p-4 shadow-sm">
      <div className="min-w-[160px] flex-1">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
          🔍 Search
        </label>
        <input
          type="search"
          placeholder="Search schemes..."
          value={filters.search || ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-xl border border-navy/12 px-4 py-2.5 text-sm focus:border-saffron focus:outline-none focus:ring-4 focus:ring-saffron/15"
        />
      </div>

      <div className="min-w-[120px]">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
          Level
        </label>
        <select
          value={filters.level || ''}
          onChange={(e) => onChange({ ...filters, level: e.target.value })}
          className="w-full rounded-xl border border-navy/12 px-4 py-2.5 text-sm focus:border-saffron focus:outline-none"
        >
          <option value="">All levels</option>
          <option value="central">🇮🇳 Central</option>
          <option value="state">🗺️ State</option>
        </select>
      </div>

      <div className="min-w-[140px]">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="w-full rounded-xl border border-navy/12 px-4 py-2.5 text-sm focus:border-saffron focus:outline-none"
        >
          <option value="">All categories</option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {CATEGORY_ICONS[opt.value]} {opt.label}
            </option>
          ))}
        </select>
      </div>

      {(filters.search || filters.level || filters.category) && (
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => onChange({ search: '', level: '', category: '' })}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-saffron-dark hover:bg-saffron/10"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
