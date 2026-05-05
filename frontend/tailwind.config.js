/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        moss: "#2f6f5e",
        coral: "#d96248",
        skyglass: "#e8f4f8"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};
