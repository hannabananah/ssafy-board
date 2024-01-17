/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        "primary-color": "#6dcef5",
        "primary-dark-color": "#498ba6",
        "primary-light-color": "#93dffa",

        "black-color": "#111111",
        "light-gray-color": "#efefef",
        "dark-gray-color": "#999999",
        "white-color": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
