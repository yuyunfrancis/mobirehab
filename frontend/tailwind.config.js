/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenPrimary: "#216f62",
        hoverColor: "#278575",
        blueColor: "#16B1DF",
        blueHover: "#23c1ed",
      },
    },
  },
  plugins: [],
};
