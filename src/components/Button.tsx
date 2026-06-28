import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cx } from '../lib/format';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';

const styles: Record<ButtonVariant, string> = {
  primary: 'bg-blue text-white shadow-[0_16px_34px_rgba(47,107,255,0.28)] hover:bg-[#2459d4]',
  secondary: 'bg-white text-navy shadow-soft ring-1 ring-charcoal/10 hover:bg-ice',
  ghost: 'bg-transparent text-navy hover:bg-charcoal/5',
  dark: 'bg-navy text-white shadow-[0_16px_34px_rgba(7,17,31,0.25)] hover:bg-charcoal',
};

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

interface ButtonLinkProps {
  children: ReactNode;
  to: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', className, type = 'button', onClick }: ButtonProps) {
  return (
    <button type={type} className={cx(base, styles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, to, variant = 'primary', className, onClick }: ButtonLinkProps) {
  return (
    <Link to={to} className={cx(base, styles[variant], className)} onClick={onClick}>
      {children}
    </Link>
  );
}
