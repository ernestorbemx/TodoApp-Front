import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // or you can use a glob pattern (multiple component styles)
    // './node_modules/@heroui/theme/dist/components/(button|modal|checkbox|table|select|card|input|pagination|date-picker|toast).{js,ts,jsx,tsx}'
    "./node_modules/@heroui/theme/dist/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
