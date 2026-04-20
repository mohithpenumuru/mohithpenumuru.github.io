/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#22d3ee',
        violet: '#8b5cf6',
        surface: {
          DEFAULT: '#06060a',
          light: '#0c0c12',
          lighter: '#14141c',
        },
        ink: {
          DEFAULT: '#fafafa',
          muted: '#94a3b8',
          dim: '#737373',
          faint: '#404040',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
