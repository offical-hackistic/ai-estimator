/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hackerBlue: "#00f5ff",
        hackerGreen: "#00ff95",
        darkBg: "#0a0f0f",
        panel: "#0f1414",
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 245, 255, 0.25)",
      }
    },
  },
  plugins: [],
};
