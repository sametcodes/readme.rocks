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
        "dark-lp-gradient":
          "linear-gradient(38deg, rgba(34,34,34,1) 0%, rgba(19,21,23,1) 12%, rgba(26,25,37,1) 32%, rgba(35,45,64,1) 64%, rgba(50,50,84,1) 100%)",
        "light-lp-gradient":
          "linear-gradient(38deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 21%, rgba(250,251,255,1) 31%, rgba(166,181,255,1) 95%, rgba(172,136,255,1) 100%)",
      }),
    },
  },
  variants: {},
  plugins: [],
};
