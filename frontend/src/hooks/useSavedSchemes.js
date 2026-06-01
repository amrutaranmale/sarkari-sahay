import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sarkari-sahay-saved';

export function useSavedSchemes() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setSaved(raw ? JSON.parse(raw) : []);
    } catch {
      setSaved([]);
    }
  }, []);

  const persist = useCallback((list) => {
    setSaved(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const isSaved = useCallback(
    (slug) => saved.some((s) => s.slug === slug),
    [saved]
  );

  const toggleSave = useCallback(
    (scheme) => {
      const exists = saved.some((s) => s.slug === scheme.slug);
      if (exists) {
        persist(saved.filter((s) => s.slug !== scheme.slug));
        return false;
      }
      persist([
        ...saved,
        {
          slug: scheme.slug,
          name: scheme.name,
          benefitAmount: scheme.benefitAmount,
          category: scheme.category,
        },
      ]);
      return true;
    },
    [saved, persist]
  );

  const removeSaved = useCallback(
    (slug) => persist(saved.filter((s) => s.slug !== slug)),
    [saved, persist]
  );

  return { saved, isSaved, toggleSave, removeSaved, count: saved.length };
}
