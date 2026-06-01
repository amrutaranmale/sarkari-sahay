import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import { formatLevel } from '../utils/formatters';
import { BENEFIT_ICONS } from '../utils/icons';
import { useSavedSchemes } from '../hooks/useSavedSchemes';

export default function SchemeCard({ scheme, language = 'en', showSave = true }) {
  const { isSaved, toggleSave } = useSavedSchemes();
  const saved = isSaved(scheme.slug);

  const name = language === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name;
  const summary =
    language === 'hi' && scheme.summaryHi ? scheme.summaryHi : scheme.summary;

  return (
    <article className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-saffron via-white to-green-india opacity-80" />

      {showSave && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleSave(scheme);
          }}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
            saved
              ? 'border-saffron bg-saffron text-white shadow-md'
              : 'border-navy/10 bg-white/90 text-navy/50 hover:border-saffron hover:text-saffron'
          }`}
          aria-label={saved ? 'Remove bookmark' : 'Save scheme'}
        >
          {saved ? '★' : '☆'}
        </button>
      )}

      <div className="flex flex-1 flex-col p-5 pt-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 pr-10">
          <CategoryBadge category={scheme.category} />
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              scheme.level === 'central'
                ? 'bg-saffron/15 text-saffron-dark'
                : 'bg-green-india/15 text-green-india'
            }`}
          >
            {formatLevel(scheme.level)}
            {scheme.state && ` · ${scheme.state.replace(/_/g, ' ')}`}
          </span>
        </div>

        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy/5 to-navy/10 text-xl">
            {BENEFIT_ICONS[scheme.benefitType] || '📋'}
          </div>
          <h3
            className={`line-clamp-2 flex-1 text-lg font-bold leading-snug text-navy group-hover:text-saffron-dark ${
              language === 'hi' ? 'font-hindi' : ''
            }`}
          >
            {name}
          </h3>
        </div>

        <p
          className={`mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-navy/65 ${
            language === 'hi' ? 'font-hindi' : ''
          }`}
        >
          {summary}
        </p>

        {scheme.benefitAmount && (
          <div className="mb-4 rounded-xl bg-green-india/5 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-green-india/80">
              Benefit
            </p>
            <p className="text-sm font-bold text-green-india">{scheme.benefitAmount}</p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            to={`/scheme/${scheme.slug}`}
            state={{ fromResults: true }}
            className="flex-1 rounded-xl border border-navy/12 px-4 py-2.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-navy/5 sm:flex-none"
          >
            Details
          </Link>
          <a
            href={scheme.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white sm:flex-none"
          >
            Apply →
          </a>
        </div>
      </div>
    </article>
  );
}
