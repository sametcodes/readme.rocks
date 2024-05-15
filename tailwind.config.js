/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "light-lp-gradient":
          "linear-gradient(45deg, hsla(0, 0%, 95%, 1) 0%, hsla(0, 0%, 100%, 1) 100%)",
        "dark-lp-gradient":
          "linear-gradient(45deg, hsla(0, 0%, 0%, 1) 0%, hsla(0, 0%, 18%, 1) 100%)",
        "square-pattern": "url('/assets/grid.svg')",
      }),
    },
  },
  variants: {},
  plugins: [],
};
