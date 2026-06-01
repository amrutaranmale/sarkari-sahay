import { useState, useEffect } from 'react';

const DEFAULT = {
  totalSchemes: 124,
  centralSchemes: 61,
  stateSchemes: 63,
  categories: 10,
  statesCovered: 28,
};

export function useStats() {
  const [stats, setStats] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/stats');
        const json = await res.json();
        if (res.ok && json.data) setStats(json.data);
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { stats, loading };
}
