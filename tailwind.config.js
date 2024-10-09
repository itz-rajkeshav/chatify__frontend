/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "rgb(78, 172, 109)",
        customText: "rgb(164, 214, 182)",
        borderColor: "rgb(234, 234, 241)",
        customGray: "#2e2e2e",
        customGrayProfile: "#878a92",
      },
      fontFamily: {
        // sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        kosugi: ["Kosugi Maru", "sans-serif"],
      },
    },
  },
  plugins: [],
};
