/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // define some colors if you want
      colors: {
        border: "hsl(200,10%,50%)",
        primary: "#1a1a1a",
        background: "#f9f9f9",
        // etc.
      },
    },
  },
  plugins: [],
}