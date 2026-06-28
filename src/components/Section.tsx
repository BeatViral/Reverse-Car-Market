import type { ReactNode } from 'react';
import { cx } from '../lib/format';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-blue">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-black leading-tight text-navy sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-charcoal/70">{description}</p> : null}
    </div>
  );
}

export function StatCard({ label, value, tone = 'blue' }: { label: string; value: string; tone?: 'blue' | 'green' | 'amber' | 'dark' }) {
  const tones = {
    blue: 'bg-blue/10 text-blue',
    green: 'bg-green/10 text-green',
    amber: 'bg-amber/15 text-[#996100]',
    dark: 'bg-navy text-white',
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow-soft ring-1 ring-charcoal/10">
      <span className={cx('inline-flex rounded-md px-2.5 py-1 text-xs font-bold', tones[tone])}>{label}</span>
      <p className="mt-4 text-3xl font-black text-navy">{value}</p>
    </div>
  );
}
