export default function SortBar({ sort, onChange }) {
  return (
    <select
      value={sort}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm font-medium text-navy focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
      aria-label="Sort schemes"
    >
      <option value="name">Name A–Z</option>
      <option value="benefit">Benefit (high first)</option>
      <option value="level">Central first</option>
      <option value="category">Category</option>
    </select>
  );
}
