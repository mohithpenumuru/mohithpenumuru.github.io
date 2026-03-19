/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00d4ff',
        violet: '#8b5cf6',
        surface: {
          DEFAULT: '#030014',
          light: '#0a0a1a',
          lighter: '#110f1f',
        },
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
