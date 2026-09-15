/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Devotional palette — saffron, lotus, deep night blue (Krishna), gold
        saffron: {
          50: '#fff8ed',
          100: '#ffefd3',
          200: '#ffdba5',
          300: '#ffc06d',
          400: '#ff9a33',
          500: '#ff7d0b',
          600: '#f06106',
          700: '#c74807',
          800: '#9e390e',
          900: '#7f310f',
        },
        lotus: {
          50: '#fdf3f6',
          100: '#fbe8ee',
          200: '#f7d0dd',
          300: '#f1a9c1',
          400: '#e8759d',
          500: '#db4d7d',
          600: '#c72f61',
          700: '#a8214c',
          800: '#8c1f42',
          900: '#761e3b',
        },
        night: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#312a7a',
          900: '#1e1a4d',
          950: '#120f30',
        },
        gold: {
          400: '#f5d982',
          500: '#e7c25a',
          600: '#cfa02f',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        deva: ['"Tiro Devanagari Sanskrit"', 'Georgia', 'serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
