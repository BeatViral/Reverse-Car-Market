import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { cx } from '../lib/format';
import { Container } from './Section';

export function DashboardShell({
  title,
  description,
  navItems,
  children,
}: {
  title: string;
  description: string;
  navItems: Array<[string, string]>;
  children: ReactNode;
}) {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-8 rounded-lg bg-navy p-6 text-white shadow-card md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">Dashboard</p>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-white/68">{description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-lg bg-white p-3 shadow-soft ring-1 ring-charcoal/10">
            <nav className="grid gap-1">
              {navItems.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cx(
                      'rounded-lg px-3 py-2 text-sm font-bold transition',
                      isActive ? 'bg-blue text-white' : 'text-charcoal/70 hover:bg-ice hover:text-navy',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}
