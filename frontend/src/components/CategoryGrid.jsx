import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/formatters';
import { CATEGORY_ICONS } from '../utils/icons';

export default function CategoryGrid() {
  const items = Object.entries(CATEGORIES);

  return (
    <section>
      <h2 className="mb-2 text-center text-2xl font-bold text-navy">
        Browse by category
      </h2>
      <p className="mb-8 text-center text-sm text-navy/60">
        Explore schemes across agriculture, health, education, and more
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map(([key, { label, color }], i) => (
          <Link
            key={key}
            to={`/browse?category=${key}`}
            className={`card-hover animate-fade-in-up opacity-0-start group flex flex-col items-center rounded-2xl border border-navy/8 bg-white p-4 text-center shadow-sm animate-delay-${Math.min((i + 1) * 100, 400)}`}
            style={{ animationFillMode: 'forwards', animationDelay: `${i * 50}ms` }}
          >
            <span className="mb-2 text-3xl transition-transform group-hover:scale-110">
              {CATEGORY_ICONS[key] || '📌'}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${color}`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
