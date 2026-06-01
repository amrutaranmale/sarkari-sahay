export default function LanguageToggle({ language, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-navy/10 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          language === 'en'
            ? 'bg-navy text-white shadow'
            : 'text-navy/60 hover:text-navy'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange('hi')}
        className={`rounded-lg px-4 py-2 text-sm font-semibold font-hindi transition-all ${
          language === 'hi'
            ? 'bg-navy text-white shadow'
            : 'text-navy/60 hover:text-navy'
        }`}
      >
        हि
      </button>
    </div>
  );
}
