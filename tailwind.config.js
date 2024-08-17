/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      borderRadius: {
        px: '1px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '16px',
        xl: '20px',
        full: '99999px',
      },
    },
  },
  fontFamily: {
    sans: ['"Work Sans"', 'sans-serif'],
  },
  plugins: [],
};
