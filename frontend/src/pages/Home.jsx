import { useNavigate, Link } from 'react-router-dom';
import EligibilityForm from '../components/EligibilityForm';
import StatsBar from '../components/StatsBar';
import CategoryGrid from '../components/CategoryGrid';
import PopularSchemes from '../components/PopularSchemes';
import FAQ from '../components/FAQ';
import { useEligibility } from '../hooks/useEligibility';

const TRUST_ITEMS = [
  { icon: '🔒', title: 'Private', desc: 'No data stored on servers' },
  { icon: '⚡', title: 'Instant', desc: 'Results in seconds' },
  { icon: '🇮🇳', title: 'Pan-India', desc: 'Central + state schemes' },
  { icon: '🔗', title: 'Official links', desc: 'Direct apply URLs' },
];

export default function Home() {
  const navigate = useNavigate();
  const { checkEligibility, loading, error } = useEligibility();

  const handleSubmit = async (formData) => {
    try {
      const result = await checkEligibility(formData);
      navigate('/results', {
        state: {
          results: result.data,
          profile: result.profile,
          count: result.count,
        },
      });
    } catch {
      /* error shown */
    }
  };

  return (
    <div className="space-y-20 pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-[#152d4a] to-navy px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-24">
        <div className="hero-pattern absolute inset-0" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-saffron/25 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-green-india/25 blur-3xl" />
        <div className="absolute right-8 top-1/2 hidden animate-float text-6xl opacity-20 lg:block">
          🇮🇳
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            भारत सरकार योजनाएँ · Live
          </span>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Discover every{' '}
            <span className="bg-gradient-to-r from-saffron to-saffron-light bg-clip-text text-transparent">
              sarkari scheme
            </span>{' '}
            you qualify for
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/75">
            One form. Instant matches. Plain-English summaries, benefit amounts,
            and direct application links — in English & Hindi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#check"
              className="btn-primary rounded-2xl px-8 py-3.5 font-bold text-white"
            >
              Check eligibility
            </a>
            <Link
              to="/browse"
              className="rounded-2xl border border-white/30 bg-white/10 px-8 py-3.5 font-bold backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Browse all schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-2">
        <StatsBar />
      </section>

      {/* Form */}
      <section id="check" className="mx-auto max-w-3xl scroll-mt-24">
        <div className="glass-card rounded-3xl p-6 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Check your eligibility
            </h2>
            <p className="mt-2 text-navy/60">
              No login · Free · Takes under 2 minutes
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}. Make sure the API server is running.
            </div>
          )}

          <EligibilityForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.title}
            className="card-hover rounded-2xl border border-navy/8 bg-white p-4 text-center shadow-sm"
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="mt-2 font-semibold text-navy">{item.title}</p>
            <p className="text-xs text-navy/55">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-navy">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: '01', title: 'Enter your profile', desc: 'State, age, income, category, gender, occupation & disability.', color: 'from-saffron/20 to-saffron/5' },
            { step: '02', title: 'Smart matching', desc: 'Our engine scans 120+ central & state schemes against your criteria.', color: 'from-navy/10 to-navy/5' },
            { step: '03', title: 'Apply with confidence', desc: 'Bookmark favourites, read Hindi summaries, open official portals.', color: 'from-green-india/20 to-green-india/5' },
          ].map((item) => (
            <div
              key={item.step}
              className={`card-hover relative overflow-hidden rounded-2xl border border-navy/8 bg-gradient-to-br ${item.color} p-6`}
            >
              <span className="text-4xl font-black text-navy/10">{item.step}</span>
              <h3 className="mt-2 text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-navy/65">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CategoryGrid />
      <PopularSchemes />
      <FAQ />
    </div>
  );
}
