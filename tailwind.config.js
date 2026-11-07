/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media', // follows the visitor's system setting
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B427B', deep: '#08325E' },
        sun: { DEFAULT: '#F2B43C', ink: '#0F1A2A' }, // yellow + the dark text used on it
        sky: { DEFAULT: '#1561A4' },
        ruby: { DEFAULT: '#BA2735' },
        ink: { DEFAULT: '#0F1A2A', soft: '#16243A', line: '#24354F' },
        surface: '#F6F8FB',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        orbit: { to: { transform: 'rotate(360deg)' } },
        'orbit-rev': { to: { transform: 'rotate(-360deg)' } },
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
      animation: {
        orbit: 'orbit 60s linear infinite',
        'orbit-slow': 'orbit 90s linear infinite',
        'orbit-rev': 'orbit-rev 75s linear infinite',
      },
    },
  },
  plugins: [],
};
