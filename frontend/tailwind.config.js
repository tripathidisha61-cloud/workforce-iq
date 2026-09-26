/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030712',
          surface: '#060b16',
          card: '#0b1329',
          cardHover: '#101a38',
          border: 'rgba(56, 189, 248, 0.15)',
          muted: '#64748b'
        },
        electric: {
          blue: '#3b82f6',
          cyan: '#00f0ff',
          sky: '#38bdf8',
          purple: '#8b5cf6'
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#060b16',
        }
      }
    },
  },
  plugins: [],
}
