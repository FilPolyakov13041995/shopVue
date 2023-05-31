/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      'xs': '375px',
      'md': '768px',
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
