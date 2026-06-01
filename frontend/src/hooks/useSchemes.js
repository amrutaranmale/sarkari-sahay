import { useState, useEffect, useCallback } from 'react';

const API = '/api';

export function useSchemes(filters = {}) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.level) params.set('level', filters.level);
      if (filters.state) params.set('state', filters.state);
      if (filters.search) params.set('search', filters.search);

      const res = await fetch(`${API}/schemes?${params}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load schemes');
      setSchemes(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.level, filters.state, filters.search]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  return { schemes, loading, error, refetch: fetchSchemes };
}

export function useScheme(slug) {
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/schemes/${slug}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Scheme not found');
        setScheme(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return { scheme, loading, error };
}
