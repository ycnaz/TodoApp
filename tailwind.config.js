/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/components/**/*.vue",
    "./src/components/*.vue",
    "./src/views/**/*.vue",
    "./src/views/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif']
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      width: {
        'custom-for-footer': 'calc(100% + 1.3px)',
      },
    },
  },
  plugins: [],
}

