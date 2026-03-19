/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00d4ff',
        surface: {
          DEFAULT: '#060b18',
          light: '#0c1628',
          lighter: '#121e36',
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
