import { formatState, formatCaste, formatIncome } from '../utils/formatters';

export default function ResultsSummary({ count, profile, breakdown }) {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-light to-navy p-6 text-white shadow-xl sm:p-8">
      <div className="hero-pattern absolute inset-0 opacity-30" />
      <div className="relative">
        <p className="mb-1 text-sm font-medium text-saffron">Your eligibility report</p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {count} scheme{count !== 1 ? 's' : ''} found
        </h1>
        {profile && (
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              formatState(profile.state),
              `Age ${profile.age}`,
              formatCaste(profile.caste),
              formatIncome(profile.incomeRange),
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {breakdown && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold">{breakdown.central}</p>
              <p className="text-xs text-white/70">Central</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold">{breakdown.state}</p>
              <p className="text-xs text-white/70">State</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold">{breakdown.categories}</p>
              <p className="text-xs text-white/70">Categories</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
