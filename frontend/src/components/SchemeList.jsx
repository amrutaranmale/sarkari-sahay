import SchemeCard from './SchemeCard';

export default function SchemeList({ schemes, language = 'en', loading, error, emptyMessage }) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-2xl bg-gradient-to-br from-white to-navy/5"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
        <span className="text-4xl">⚠️</span>
        <p className="mt-4 font-semibold text-red-700">Could not load schemes</p>
        <p className="mt-2 text-sm text-red-600/80">{error}</p>
      </div>
    );
  }

  if (!schemes?.length) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-navy/15 bg-white/60 p-16 text-center">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 text-xl font-bold text-navy">
          {emptyMessage || 'No schemes found'}
        </p>
        <p className="mt-2 text-sm text-navy/55">
          Try adjusting your filters or eligibility criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {schemes.map((scheme, i) => (
        <div
          key={scheme.id}
          className="animate-fade-in-up opacity-0-start"
          style={{ animationDelay: `${Math.min(i * 60, 400)}ms`, animationFillMode: 'forwards' }}
        >
          <SchemeCard scheme={scheme} language={language} />
        </div>
      ))}
    </div>
  );
}
