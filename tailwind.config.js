/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A0A0A',
          secondary: '#C9AE7E',
          accent: '#EFE9DD',
        },
        surface: {
          background: '#0A0A0A',
          surface: '#131211',
          elevated: '#1A1815',
          dim: '#060606',
          container: '#151311',
          'container-low': '#0E0D0C',
        },
        text: {
          primary: '#EFE9DD',
          secondary: '#B9AF9F',
          muted: '#877E70',
          inverse: '#F6F3ED',
        },
        border: {
          default: '#2A2723',
          strong: '#4A4238',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
      },
    },
  },
  plugins: [],
}
