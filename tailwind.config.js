/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030303',
        surface: '#0a0a0a',
        surfaceElevated: '#111111',
        border: '#1f1f1f',
        borderHover: '#2a2a2a',
        text: '#fafafa',
        textMuted: '#a1a1aa',
        textSubtle: '#71717a',
        accent: '#3b82f6',
        accentHover: '#2563eb',
        accentMuted: '#1e3a5f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}
