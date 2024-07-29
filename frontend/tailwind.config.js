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
       lineClamp: {
        3: '3',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
