import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import SchemeDetail from './pages/SchemeDetail';
import Browse from './pages/Browse';
import Saved from './pages/Saved';
import Contact from './pages/Contact'; // <-- Step 1: Naya Contact page import kiya
import { useSavedSchemes } from './hooks/useSavedSchemes';
import AssistanceChatbot from './components/AssistanceChatbot';

function Header() {
  const location = useLocation();
  const { count } = useSavedSchemes();

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse' },
    { to: '/saved', label: 'Saved', badge: count },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-saffron via-saffron-dark to-saffron text-lg font-bold text-white shadow-lg shadow-saffron/30 transition-transform group-hover:scale-105">
            स
          </span>
          <div>
            <span className="text-lg font-bold tracking-tight text-navy">
              SarkariSahay
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-navy/45">
              Scheme Finder
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map(({ to, label, badge }) => (
            <Link
              key={to}
              to={to}
              className={`relative rounded-xl px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                isActive(to)
                  ? 'bg-navy text-white shadow-md'
                  : 'text-navy/70 hover:bg-navy/5 hover:text-navy'
              }`}
            >
              {label}
              {badge > 0 && (
                <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-assistance-chat'))}
            className="hidden rounded-xl border border-navy/15 px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-navy/5 sm:inline-flex"
          >
            Assistance
          </button>
          <Link
            to="/#check"
            className="btn-primary hidden rounded-xl px-4 py-2 text-sm font-bold text-white sm:inline-flex"
          >
            Check now
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-navy/10 bg-gradient-to-b from-white to-navy/[0.03] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-navy">SarkariSahay</p>
            <p className="mt-2 text-sm text-navy/60">
              Helping every Indian discover government schemes they deserve.
            </p>
          </div>
          <div>
            <p className="font-semibold text-navy">Quick links</p>
            <ul className="mt-3 space-y-2 text-sm text-navy/65">
              <li><Link to="/" className="hover:text-saffron-dark">Eligibility check</Link></li>
              <li><Link to="/browse" className="hover:text-saffron-dark">Browse schemes</Link></li>
              <li><Link to="/saved" className="hover:text-saffron-dark">Saved schemes</Link></li>
              {/* Step 2: Google AdSense ke liye Footer mein link jodh diya */}
              <li><Link to="/contact" className="hover:text-saffron-dark font-medium text-orange-600">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-navy">Disclaimer</p>
            <p className="mt-3 text-sm text-navy/60">
              Informational tool only. Verify eligibility on official government portals before applying.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-8 text-sm text-navy/50">
          <p>© {new Date().getFullYear()} SarkariSahay by Amruta Ranmale · Made with ❤️ for India 🇮🇳</p>
          <p className="flex gap-2">
            <span className="rounded bg-saffron/20 px-2 py-0.5 text-saffron-dark">Central</span>
            <span className="rounded bg-green-india/20 px-2 py-0.5 text-green-india">State</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/saved" element={<Saved />} />
          {/* Step 3: Naya Contact page route define kar diya */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/scheme/:slug" element={<SchemeDetail />} />
        </Routes>
      </main>
      <Footer />
      <AssistanceChatbot />
    </div>
  );
}