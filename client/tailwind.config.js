/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0f172a',
          800: '#111827',
          700: '#0b1220'
        }
      }
    }
  },
  plugins: []
};

