import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonLink } from './Button';
import { Container } from './Section';
import { cx } from '../lib/format';

const navItems = [
  ['How It Works', '/how-it-works'],
  ['Buyers', '/buyers'],
  ['Sellers', '/sellers'],
  ['Dealer Inventory', '/dealer-inventory'],
  ['Pricing', '/pricing'],
];

function navClass({ isActive }: { isActive: boolean }) {
  return cx('text-sm font-bold transition hover:text-blue', isActive ? 'text-blue' : 'text-charcoal/70');
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const { role } = useAuth();
  const dashboardPath = role === 'dealer' ? '/dealer/dashboard' : role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard';

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-white/88 backdrop-blur">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-lg font-black text-white">R</span>
            <span className="text-sm font-black uppercase tracking-[0.08em] text-navy sm:text-base">Reverse Car Market</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} className={navClass}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink to="/auth" variant="secondary">
              Sign In
            </ButtonLink>
            <ButtonLink to="/buyer/create-wanted-card">Post What You Want</ButtonLink>
          </div>
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg p-2 text-navy lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </Container>
        {open ? (
          <div className="border-t border-charcoal/10 bg-white lg:hidden">
            <Container className="grid gap-2 py-4">
              {[...navItems, ['Search', '/search'], ['Dashboard', dashboardPath], ['Sign In', '/auth']].map(([label, path]) => (
                <NavLink key={path} to={path} className="rounded-lg px-3 py-2 text-sm font-bold text-charcoal/75 hover:bg-ice" onClick={() => setOpen(false)}>
                  {label}
                </NavLink>
              ))}
              <ButtonLink to="/buyer/create-wanted-card" className="mt-2" onClick={() => setOpen(false)}>
                Post What You Want
              </ButtonLink>
            </Container>
          </div>
        ) : null}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  const columns = [
    ['Company', ['About', 'How It Works', 'Contact']],
    ['Marketplace', ['Buyers', 'Sellers', 'Dealer Inventory', 'Pricing']],
    ['Trust', ['Trust & Safety', 'No Fake Demand Policy', 'Dealer Verification', 'Buying Safety Checklist']],
    ['Legal', ['Terms', 'Privacy', 'Disclaimer']],
  ];

  return (
    <footer className="border-t border-charcoal/10 bg-navy py-12 text-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="text-2xl font-black">Reverse Car Market</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">Reverse Car Market - the car market, flipped.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map(([heading, links]) => (
              <div key={heading as string}>
                <p className="text-sm font-black">{heading as string}</p>
                <div className="mt-3 grid gap-2">
                  {(links as string[]).map((link) => (
                    <Link
                      key={link}
                      to={link === 'How It Works' ? '/how-it-works' : link === 'Buyers' ? '/buyers' : link === 'Sellers' ? '/sellers' : link === 'Dealer Inventory' ? '/dealer-inventory' : link === 'Pricing' ? '/pricing' : '/trust'}
                      className="text-sm text-white/62 hover:text-white"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 text-xs text-white/45">Reverse Car Market is a matching platform, not a vehicle inspector. Buyers should verify vehicle details, seller identity and PPSR/car history before purchase.</p>
      </Container>
    </footer>
  );
}
