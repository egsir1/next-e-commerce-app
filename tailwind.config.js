/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  colors: {
    headingColor: "#2e2e2e",
    textColor: "#515151",
    cartNumBg: "#e80013",
    primary: "#f5f3f3",
    amber: "#18f5b3",
    deliveroo: "#0b6b4e",
    main: "#03162e",
    hex: "#03162e",
    darkGreen: "#137029",
    amber2: "#027d29",
    head: "#111222",
  },
  plugins: [],
};
