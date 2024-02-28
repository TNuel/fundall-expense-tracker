/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans'],
        circular: ['circular-std', 'sans'],
      },
      colors: {
        hover: "#C4EDFF",
        textColor: "#30443C",
        tertiary: "#EFEFEF",
        shadowColor: "#76D42D",
        grayColor: "#D8D5D5",
        primary: "#F1F2F6",
        secondary: "#4DE897",
        success: "#9FC849",
        error: "#E01507",
      },
    },
  },
  plugins: [],
}