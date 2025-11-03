/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ee8c2b",
        "background-light": "#f8f7f6",
        "background-dark": "#221910",
        "text-light": "#1b140d",
        "text-dark": "#ffffff",
        "card-light": "#ffffff",
        "card-dark": "#2a2016",
        "border-light": "#e7dbcf",
        "border-dark": "#403222",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
};
