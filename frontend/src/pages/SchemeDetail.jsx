import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScheme } from '../hooks/useSchemes';
import CategoryBadge from '../components/CategoryBadge';
import LanguageToggle from '../components/LanguageToggle';
import ShareButton from '../components/ShareButton';
import { formatLevel, formatState } from '../utils/formatters';
import { BENEFIT_ICONS } from '../utils/icons';
import { useSavedSchemes } from '../hooks/useSavedSchemes';

function asArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }
  return [];
}

export default function SchemeDetail() {
  const { slug } = useParams();
  const { scheme, loading, error } = useScheme(slug);
  const [language, setLanguage] = useState('en');
  const { isSaved, toggleSave } = useSavedSchemes();
  const saved = scheme ? isSaved(scheme.slug) : false;

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-10 w-1/3 animate-pulse rounded-xl bg-navy/10" />
        <div className="h-64 animate-pulse rounded-3xl bg-navy/10" />
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
        <span className="text-4xl">😕</span>
        <p className="mt-4 font-semibold text-red-700">{error || 'Scheme not found'}</p>
        <Link to="/" className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-white">
          Back to home
        </Link>
      </div>
    );
  }

  const name = language === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name;
  const summary =
    language === 'hi' && scheme.summaryHi ? scheme.summaryHi : scheme.summary;
  const castes = asArray(scheme.castes);
  const occupations = asArray(scheme.occupations);

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/browse"
          className="inline-flex items-center gap-1 text-sm font-medium text-saffron-dark hover:underline"
        >
          ← All schemes
        </Link>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleSave(scheme)}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
              saved
                ? 'border-saffron bg-saffron text-white'
                : 'border-navy/15 bg-white text-navy hover:border-saffron'
            }`}
          >
            {saved ? '★ Saved' : '☆ Save'}
          </button>
          <ShareButton title={scheme.name} text={scheme.summary} />
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl">
        <div className="h-2 bg-gradient-to-r from-saffron via-white to-green-india" />

        <div className="p-6 sm:p-10">
          <div className="mb-6 flex flex-wrap items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron/20 to-green-india/20 text-3xl">
              {BENEFIT_ICONS[scheme.benefitType] || '📋'}
            </div>
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap gap-2">
                <CategoryBadge category={scheme.category} />
                <span className="rounded-full bg-navy/10 px-3 py-0.5 text-xs font-semibold text-navy">
                  {formatLevel(scheme.level)}
                </span>
                {scheme.state && (
                  <span className="rounded-full bg-green-india/10 px-3 py-0.5 text-xs font-semibold text-green-india">
                    {formatState(scheme.state)}
                  </span>
                )}
              </div>
              <h1
                className={`text-2xl font-bold text-navy sm:text-3xl ${
                  language === 'hi' ? 'font-hindi' : ''
                }`}
              >
                {name}
              </h1>
            </div>
          </div>

          <p
            className={`text-base leading-relaxed text-navy/75 ${
              language === 'hi' ? 'font-hindi' : ''
            }`}
          >
            {summary}
          </p>

          {scheme.benefitAmount && (
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-green-india/10 to-green-india/5 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-green-india/80">
                Benefit amount
              </p>
              <p className="mt-1 text-2xl font-bold text-green-india">{scheme.benefitAmount}</p>
              {scheme.benefitType && (
                <p className="mt-2 flex items-center gap-2 text-sm capitalize text-navy/55">
                  {BENEFIT_ICONS[scheme.benefitType]} {scheme.benefitType.replace(/-/g, ' ')}
                </p>
              )}
            </div>
          )}

          {scheme.ministry && (
            <p className="mt-6 flex items-center gap-2 text-sm text-navy/65">
              <span className="font-semibold text-navy">🏛 Ministry:</span> {scheme.ministry}
            </p>
          )}

          {scheme.matchReasons?.length > 0 && (
            <div className="mt-8 rounded-2xl border border-saffron/20 bg-saffron/5 p-5">
              <p className="mb-3 font-semibold text-navy">✓ Why you may qualify</p>
              <ul className="space-y-2">
                {scheme.matchReasons.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-navy/75">
                    <span className="text-green-india">●</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-navy/10 bg-navy/[0.02] p-6">
            <p className="mb-4 font-bold text-navy">Eligibility criteria</p>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {(scheme.minAge != null || scheme.maxAge != null) && (
                <div className="rounded-xl bg-white p-3">
                  <dt className="text-xs font-medium uppercase text-navy/45">Age</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {scheme.minAge != null && `${scheme.minAge}+`}
                    {scheme.minAge != null && scheme.maxAge != null && ' · '}
                    {scheme.maxAge != null && `up to ${scheme.maxAge}`}
                  </dd>
                </div>
              )}
              {(scheme.minIncome != null || scheme.maxIncome != null) && (
                <div className="rounded-xl bg-white p-3">
                  <dt className="text-xs font-medium uppercase text-navy/45">Income</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {scheme.maxIncome != null
                      ? `Up to ₹${scheme.maxIncome.toLocaleString('en-IN')}/yr`
                      : '—'}
                  </dd>
                </div>
              )}
              {castes.length > 0 && !castes.includes('all') && (
                <div className="rounded-xl bg-white p-3">
                  <dt className="text-xs font-medium uppercase text-navy/45">Category</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {castes.join(', ').toUpperCase()}
                  </dd>
                </div>
              )}
              {occupations.length > 0 && !occupations.includes('all') && (
                <div className="rounded-xl bg-white p-3">
                  <dt className="text-xs font-medium uppercase text-navy/45">Occupation</dt>
                  <dd className="mt-1 font-semibold capitalize text-navy">
                    {occupations.join(', ')}
                  </dd>
                </div>
              )}
              {scheme.disabilityRequired && (
                <div className="rounded-xl bg-white p-3">
                  <dt className="text-xs font-medium uppercase text-navy/45">Disability</dt>
                  <dd className="mt-1 font-semibold text-navy">Required</dd>
                </div>
              )}
            </dl>
          </div>

          <a
            href={scheme.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold text-white"
          >
            Apply on official portal →
          </a>
        </div>
      </div>
    </article>
  );
}
