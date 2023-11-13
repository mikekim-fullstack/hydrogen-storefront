import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  // Adding new font-family css
  fontFamily: {
    'Comorant': ['Cormorant Garamond', 'serif'],
    'Monserrat': ['Montserrat', 'sans-serif'],
    'Poppins': ['Poppins', 'sans-serif'],
  },
};
