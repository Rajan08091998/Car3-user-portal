/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // <-- IMPORTANT: disables system preference, uses class instead
  lightMode: "class", // <-- IMPORTANT: enables light mode with class
  plugins: [],
};
