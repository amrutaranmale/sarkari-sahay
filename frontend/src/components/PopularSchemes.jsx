import { Link } from 'react-router-dom';
import { useSchemes } from '../hooks/useSchemes';
import CategoryBadge from './CategoryBadge';
import { BENEFIT_ICONS } from '../utils/icons';

export default function PopularSchemes() {
  const { schemes, loading } = useSchemes({});

  const featured = schemes.slice(0, 4);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-2xl bg-white/70" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Featured schemes</h2>
          <p className="mt-1 text-sm text-navy/60">Popular central & state programs</p>
        </div>
        <Link
          to="/browse"
          className="text-sm font-semibold text-saffron-dark hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((scheme) => (
          <Link
            key={scheme.id}
            to={`/scheme/${scheme.slug}`}
            className="card-hover group flex gap-4 rounded-2xl border border-navy/8 bg-white p-5 shadow-sm"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-saffron/20 to-green-india/20 text-2xl">
              {BENEFIT_ICONS[scheme.benefitType] || '📋'}
            </div>
            <div className="min-w-0 flex-1">
              <CategoryBadge category={scheme.category} />
              <h3 className="mt-2 line-clamp-2 font-semibold text-navy group-hover:text-saffron-dark">
                {scheme.name}
              </h3>
              {scheme.benefitAmount && (
                <p className="mt-1 text-sm font-medium text-green-india">
                  {scheme.benefitAmount}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
