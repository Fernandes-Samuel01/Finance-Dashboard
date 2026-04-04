/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        card: "#FFFFFF",
        primary: "#2563EB",
        secondary: "#64748B",
        accent: "#F1F5F9",
      },
      borderRadius: {
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}