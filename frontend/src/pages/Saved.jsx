import { Link } from 'react-router-dom';
import { useSavedSchemes } from '../hooks/useSavedSchemes';
import CategoryBadge from '../components/CategoryBadge';

export default function Saved() {
  const { saved, removeSaved, count } = useSavedSchemes();

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy">Saved schemes</h1>
      <p className="mt-2 text-navy/60">
        {count === 0
          ? 'Bookmark schemes from results or browse pages'
          : `${count} scheme${count !== 1 ? 's' : ''} saved on this device`}
      </p>

      {count === 0 ? (
        <div className="mt-12 rounded-3xl border-2 border-dashed border-navy/15 bg-white/50 p-12 text-center">
          <span className="text-5xl">☆</span>
          <p className="mt-4 text-lg font-semibold text-navy">No saved schemes yet</p>
          <p className="mt-2 text-sm text-navy/60">
            Tap the star on any scheme card to save it here
          </p>
          <Link
            to="/"
            className="btn-primary mt-6 inline-block rounded-xl px-8 py-3 font-semibold text-white"
          >
            Check eligibility
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {saved.map((item) => (
            <li
              key={item.slug}
              className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-navy/8 bg-white p-5 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <CategoryBadge category={item.category} />
                <Link
                  to={`/scheme/${item.slug}`}
                  className="mt-2 block font-semibold text-navy hover:text-saffron-dark"
                >
                  {item.name}
                </Link>
                {item.benefitAmount && (
                  <p className="mt-1 text-sm text-green-india">{item.benefitAmount}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/scheme/${item.slug}`}
                  className="rounded-xl border border-navy/12 px-4 py-2 text-sm font-medium"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => removeSaved(item.slug)}
                  className="rounded-xl px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
