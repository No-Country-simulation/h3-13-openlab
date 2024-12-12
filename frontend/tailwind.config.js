/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "rgba(97, 147, 255, 0.1)",
          "semi-light": "rgba(97, 147, 255, 0.4)",
          DEFAULT: "#6193FF",
        },
        "color-0": "#1A1A1A",
        "color-1": "#3A23FF",
        "color-2": "#292D32",
        "color-3": "#2F00FF",
        "color-4": "#0F0F30",
        "color-5": "#3D7BFF",
      },
      white:"#ffffff",
      blue: {
        700: '#1D4ED8',
      },
      sky: {
        400: '#38BDF8',
      },
      fontFamily: {
        primary: ["Commissioner", "serif"],
        secondary: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
};
