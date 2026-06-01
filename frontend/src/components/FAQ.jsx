import { useState } from 'react';

const FAQS = [
  {
    q: 'Is SarkariSahay an official government website?',
    a: 'No. SarkariSahay is an independent informational tool. Always verify eligibility and apply only through official government portals linked on each scheme page.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No login is required for eligibility checks. Your profile data is used only for matching and is not stored on our servers.',
  },
  {
    q: 'How accurate are the eligibility results?',
    a: 'We match your profile against scheme criteria in our database. Final eligibility is determined by the implementing department — always confirm on the official portal before applying.',
  },
  {
    q: 'Can I save schemes for later?',
    a: 'Yes! Click the bookmark icon on any scheme card. Saved schemes are stored in your browser and visible on the Saved page.',
  },
  {
    q: 'Are Hindi summaries available?',
    a: 'Many schemes include Hindi (हिंदी) summaries. Use the language toggle on results and detail pages.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="mb-2 text-center text-2xl font-bold text-navy">
        Frequently asked questions
      </h2>
      <p className="mb-8 text-center text-sm text-navy/60">
        Quick answers about how SarkariSahay works
      </p>
      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy hover:bg-navy/[0.02]"
            >
              {item.q}
              <span
                className={`shrink-0 text-saffron transition-transform ${
                  open === i ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            {open === i && (
              <div className="border-t border-navy/5 px-5 py-4 text-sm leading-relaxed text-navy/70">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
