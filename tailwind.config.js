/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        knewit: {
          indigo: '#4F46E5',
          cyan: '#06B6D4',
          mint: '#10B981',
          orange: '#F97316',
          dark: '#090D16',
          panel: '#0B1120',
          card: '#111827',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        serif: ['Georgia', 'Cambria', 'serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'glow-indigo': '0 0 35px -5px rgba(79, 70, 229, 0.35)',
        'glow-mint': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
