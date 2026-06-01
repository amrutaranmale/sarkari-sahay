import { useStats } from '../hooks/useStats';

function StatCard({ value, label, icon, delay }) {
  return (
    <div
      className={`glass-card card-hover animate-fade-in-up opacity-0-start rounded-2xl p-5 text-center ${delay}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <span className="mb-2 block text-2xl">{icon}</span>
      <p className="text-2xl font-bold text-navy sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy/55 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        value={stats.totalSchemes}
        label="Total schemes"
        icon="📋"
        delay="animate-delay-100"
      />
      <StatCard
        value={stats.centralSchemes}
        label="Central govt"
        icon="🇮🇳"
        delay="animate-delay-200"
      />
      <StatCard
        value={stats.stateSchemes}
        label="State schemes"
        icon="🗺️"
        delay="animate-delay-300"
      />
      <StatCard
        value={stats.categories}
        label="Categories"
        icon="🏷️"
        delay="animate-delay-400"
      />
    </div>
  );
}
