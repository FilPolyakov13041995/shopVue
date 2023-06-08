/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      'xs': '365px',
      'md': '768px',
      'lg': '1024px',
    },
  },
  plugins: [
    
  ],
};
