/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
  darkMode: 'class',
  content: [
    "index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
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
  plugins: [
    forms,
  ],
}

