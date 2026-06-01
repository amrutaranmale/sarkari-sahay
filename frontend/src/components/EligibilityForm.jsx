import {
  STATES,
  INCOME_RANGES,
  CASTES,
  GENDERS,
  OCCUPATIONS,
} from '../utils/formatters';

export default function EligibilityForm({ onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    onSubmit({
      state: form.get('state'),
      age: form.get('age'),
      incomeRange: form.get('incomeRange'),
      caste: form.get('caste'),
      gender: form.get('gender'),
      occupation: form.get('occupation'),
      disability: form.get('disability'),
    });
  };

  const selectClass =
    'w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm transition-all focus:border-saffron focus:outline-none focus:ring-4 focus:ring-saffron/15';
  const labelClass = 'mb-2 flex items-center gap-2 text-sm font-semibold text-navy';

  const fields = [
    { id: 'state', label: 'State / UT', icon: '🗺️', options: STATES, placeholder: 'Select your state' },
    { id: 'age', label: 'Age', icon: '🎂', type: 'number', placeholder: 'e.g. 25' },
    { id: 'incomeRange', label: 'Annual family income', icon: '💰', options: INCOME_RANGES, placeholder: 'Select income range' },
    { id: 'caste', label: 'Category', icon: '📋', options: CASTES, placeholder: 'Select category' },
    { id: 'gender', label: 'Gender', icon: '👤', options: GENDERS, placeholder: 'Select gender' },
    { id: 'occupation', label: 'Occupation', icon: '💼', options: OCCUPATIONS, placeholder: 'Select occupation' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className={labelClass}>
              <span>{field.icon}</span>
              {field.label} <span className="text-red-500">*</span>
            </label>
            {field.type === 'number' ? (
              <input
                id={field.id}
                name={field.id}
                type="number"
                min="1"
                max="120"
                required
                placeholder={field.placeholder}
                className={selectClass}
              />
            ) : (
              <select
                id={field.id}
                name={field.id}
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <fieldset className="rounded-xl border border-navy/10 bg-navy/[0.02] p-4">
        <legend className={labelClass}>
          <span>♿</span>
          Person with disability? <span className="text-red-500">*</span>
        </legend>
        <div className="mt-3 flex gap-4">
          {['no', 'yes'].map((val) => (
            <label
              key={val}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-navy/10 bg-white px-4 py-2.5 has-[:checked]:border-saffron has-[:checked]:bg-saffron/5"
            >
              <input
                type="radio"
                name="disability"
                value={val}
                defaultChecked={val === 'no'}
                className="text-saffron focus:ring-saffron"
              />
              <span className="text-sm font-medium capitalize">{val}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full rounded-2xl py-4 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-16"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Checking eligibility...
          </span>
        ) : (
          '🔍 Find my schemes'
        )}
      </button>
    </form>
  );
}
