import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SchemeList from '../components/SchemeList';
import FilterBar from '../components/FilterBar';
import LanguageToggle from '../components/LanguageToggle';
import { useSchemes } from '../hooks/useSchemes';

export default function Browse() {
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    category: searchParams.get('category') || '',
  });

  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search') || '';
    setFilters((f) => ({
      ...f,
      ...(cat ? { category: cat } : {}),
      search,
    }));
  }, [searchParams]);

  const { schemes, loading, error } = useSchemes(filters);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">Browse all schemes</h1>
        <p className="mt-2 text-navy/60">
          Explore central and state government programs across India
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <FilterBar filters={filters} onChange={setFilters} />
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      <SchemeList
        schemes={schemes}
        language={language}
        loading={loading}
        error={error}
        emptyMessage="No schemes match your filters"
      />
    </div>
  );
}
