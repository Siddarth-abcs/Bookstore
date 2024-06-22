/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'global-primary': '#6EC1E4',
        'global-secondary': '#54595F',
        'global-text': '#7A7A7A',
        'global-accent': '#61CE70',
        'hero':'#FFD700',
        'hero-text': '#333333',
      }
    },
  },
  plugins: [],
}