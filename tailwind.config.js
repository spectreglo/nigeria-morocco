/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#1D6731",
        lightGreen: "#4CAF4F",
        darkGreen: "#004f2b",
        silver: "#F5F7FA",
        lightBlack: "#263238",
        fontColor: "#4D4D4D",
        bgImage: "rgba(242, 242, 242, 0.85)",
        cardGreen: "#009A49",
        cardRed: "#C1272D",
        cardBlack: "#212121",
      },
      height: {
        70: "70vh",
      },
    },
  },
  plugins: [],
};
