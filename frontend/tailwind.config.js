/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#2C3333",
        green_dark: "#395B64",
        green: "#A5C9CA",
        green_lite: "#E7F6F2",
      },
      transformOrigin: {
        0: "0%",
      },
    },
  },
  plugins: [],
};
