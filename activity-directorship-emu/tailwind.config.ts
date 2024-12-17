import { withUt } from 'uploadthing/tw';

module.exports = withUt({
  darkMode: ['class'], // Enables dark mode based on a 'class'
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          500: '#4b4394',
          50: '#211e42',
          DEFAULT: '#4b4394',
          foreground: '#EDEDED', // Light grey text for contrast
        },
        coral: {
          500: '#15BF59',
        },
        grey: {
          600: '#333333', // Darker grey for dark mode
          500: '#4F4F4F',
          400: '#666666',
          300: '#A3A3A3',
          50: '#1F1F1F', // Background alternative
        },
        black: '#000000',
        white: '#FFFFFF',
        
        // Dark mode-specific variables
        background: '#121212', // Default dark background
        foreground: '#EDEDED', // Light text for readability
        border: '#292929',
        input: '#333333',
        ring: '#4b4394',
        secondary: {
          DEFAULT: '#1E1E2E', // Slightly lighter than background
          foreground: '#BBBBBB',
        },
        destructive: {
          DEFAULT: '#FF4B4B',
          foreground: '#FEE2E2',
        },
        muted: {
          DEFAULT: '#2C2C2C',
          foreground: '#A0A0A0',
        },
        accent: {
          DEFAULT: '#373737',
          foreground: '#D1D1D1',
        },
        popover: {
          DEFAULT: '#1E1E1E',
          foreground: '#E5E5E5',
        },
        card: {
          DEFAULT: '#1A1A1A',
          foreground: '#E0E0E0',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      backgroundImage: {
        'dotted-pattern': "url('/assets/images/dotted-pattern.png')",
        'hero-img': "url('/assets/images/hero.png')",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
});
