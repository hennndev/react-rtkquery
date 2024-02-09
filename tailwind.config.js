/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "cards": "repeat(auto-fill, minmax(300px, 1fr))"
      }
    },
  },
  plugins: [],
}