/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "spin": {
          from: {  transform: "rotate(0deg)" },
          to: { height: "transform: rotate(360deg)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
         
      },

      animation: {
        "spin": "spin 1s linear infinite",  
      },
    },
  },
  plugins: [],
}