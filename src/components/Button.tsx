import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { cx } from '../lib/format';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';

const styles: Record<ButtonVariant, string> = {
  primary: 'bg-blue text-white hover:bg-[#2459d4] shadow-soft',
  secondary: 'bg-white text-navy ring-1 ring-charcoal/10 hover:bg-ice',
  ghost: 'bg-transparent text-navy hover:bg-charcoal/5',
  dark: 'bg-navy text-white hover:bg-charcoal',
};

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue';

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
