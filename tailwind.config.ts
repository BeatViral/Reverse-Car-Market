import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#07111F',
        charcoal: '#111827',
        ice: '#F5F7FA',
        blue: '#2F6BFF',
        green: '#18A058',
        amber: '#F5A524',
        ink: '#172033',
      },
      boxShadow: {
        card: '0 18px 55px rgba(7, 17, 31, 0.11)',
        soft: '0 12px 32px rgba(17, 24, 39, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
