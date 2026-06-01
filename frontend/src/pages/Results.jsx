import { useState, useMemo } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import SchemeList from '../components/SchemeList';
import FilterBar from '../components/FilterBar';
import LanguageToggle from '../components/LanguageToggle';
import ShareButton from '../components/ShareButton';
import SortBar from '../components/SortBar';
import ResultsSummary from '../components/ResultsSummary';
import { sortSchemes } from '../utils/sortSchemes';

export default function Results() {
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({ search: '', level: '', category: '' });
  const [sort, setSort] = useState('name');
  const [savedOnly, setSavedOnly] = useState(false);

  const { results: initialResults, profile, count } = location.state || {};

  const savedSlugs = useMemo(() => {
    try {
      const raw = localStorage.getItem('sarkari-sahay-saved');
      return raw ? JSON.parse(raw).map((s) => s.slug) : [];
    } catch {
      return [];
    }
  }, []);

  if (!initialResults) {
    return <Navigate to="/" replace />;
  }

  const filtered = useMemo(() => {
    let list = initialResults.filter((scheme) => {
      if (filters.level && scheme.level !== filters.level) return false;
      if (filters.category && scheme.category !== filters.category) return false;
      if (savedOnly && !savedSlugs.includes(scheme.slug)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const haystack = `${scheme.name} ${scheme.summary}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return sortSchemes(list, sort);
  }, [initialResults, filters, sort, savedOnly, savedSlugs]);

  const breakdown = useMemo(() => {
    const central = initialResults.filter((s) => s.level === 'central').length;
    const state = initialResults.filter((s) => s.level === 'state').length;
    const categories = new Set(initialResults.map((s) => s.category)).size;
    return { central, state, categories };
  }, [initialResults]);

  const handlePrint = () => window.print();

  return (
    <div>
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-saffron-dark hover:underline"
      >
        ← New search
      </Link>

      <ResultsSummary count={count} profile={profile} breakdown={breakdown} />

      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <ShareButton
            title="My SarkariSahay Results"
            text={`I found ${count} government schemes I may be eligible for!`}
          />
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm font-medium text-navy hover:bg-navy/5"
          >
            🖨 Print
          </button>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm font-medium">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(e) => setSavedOnly(e.target.checked)}
              className="rounded text-saffron"
            />
            Saved only
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SortBar sort={sort} onChange={setSort} />
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </div>

      <div className="no-print mb-6">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <p className="mb-4 text-sm text-navy/50">
        Showing <strong>{filtered.length}</strong> of {count} eligible schemes
      </p>

      <SchemeList
        schemes={filtered}
        language={language}
        loading={false}
        emptyMessage="No schemes match your current filters"
      />
    </div>
  );
}
