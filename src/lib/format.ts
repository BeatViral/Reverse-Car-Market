export function formatCurrency(value?: number, compact = false) {
  if (value === undefined || Number.isNaN(value)) return 'Any budget';
  if (compact && value >= 1000) return `$${Math.round(value / 1000)}k`;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value?: number) {
  if (value === undefined || Number.isNaN(value)) return 'Any';
  return new Intl.NumberFormat('en-AU').format(value);
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
