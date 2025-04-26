/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFCFDB', // Logo pink
          50: '#FFF9FA',
          100: '#FFF0F4',
          200: '#FFE6EC',
          300: '#FFDCE5',
          400: '#FFD6E0',
          500: '#FFCFDB',
          600: '#FF9CB4',
          700: '#FF698D',
          800: '#FF3666',
          900: '#FF033F'
        },
        secondary: {
          DEFAULT: '#222222', // Black
          50: '#E6E6E6',
          100: '#CCCCCC',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#222222',
          600: '#1F1F1F',
          700: '#1A1A1A',
          800: '#141414',
          900: '#0A0A0A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
};
