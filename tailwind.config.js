/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mario: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        mario: {
          red:     '#E52521',
          blue:    '#049CD8',
          yellow:  '#FBD000',
          green:   '#43B047',
          brown:   '#8B4513',
          darkbrown: '#5C2E00',
          sky:     '#5C94FC',
          ground:  '#C84C0C',
          pipe:    '#2BA94C',
          pipedark:'#1A6B2F',
          brick:   '#C8440C',
          block:   '#F8B800',
          blockdark: '#C88800',
          night:   '#0D0D2B',
          underground: '#000000',
          coin:    '#FFD700',
          white:   '#FFFFFF',
          black:   '#000000',
        }
      },
      boxShadow: {
        'pixel': '4px 4px 0px #000000',
        'pixel-sm': '2px 2px 0px #000000',
        'pixel-lg': '6px 6px 0px #000000',
        'pixel-white': '4px 4px 0px #FFFFFF',
        'pixel-yellow': '4px 4px 0px #FBD000',
        'pixel-red': '4px 4px 0px #E52521',
        'inset-pixel': 'inset 2px 2px 0px rgba(255,255,255,0.4), inset -2px -2px 0px rgba(0,0,0,0.4)',
      },
      animation: {
        'bounce-pixel': 'bouncePixel 0.5s steps(2) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-coin': 'spinCoin 1s steps(4) infinite',
        'blink': 'blink 1s steps(1) infinite',
        'march': 'march 0.4s steps(2) infinite',
        'slide-in': 'slideIn 0.3s steps(4) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shake': 'shake 0.3s steps(3)',
        'star-spin': 'starSpin 0.5s linear infinite',
        'walk': 'walk 8s linear infinite',
      },
      keyframes: {
        bouncePixel: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spinCoin: {
          '0%':   { transform: 'scaleX(1)' },
          '25%':  { transform: 'scaleX(0.5)' },
          '50%':  { transform: 'scaleX(0.1)' },
          '75%':  { transform: 'scaleX(0.5)' },
          '100%': { transform: 'scaleX(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        march: {
          '0%': { backgroundPosition: '0px' },
          '100%': { backgroundPosition: '-64px' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        starSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        walk: {
          '0%': { transform: 'translateX(-120px)' },
          '100%': { transform: 'translateX(calc(100vw + 120px))' },
        },
      },
      backgroundImage: {
        'mario-sky': 'linear-gradient(180deg, #5C94FC 0%, #5C94FC 70%, #81B0FF 100%)',
        'mario-underground': 'linear-gradient(180deg, #000000 0%, #0D0D2B 100%)',
        'mario-castle': 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'pixel-grid': 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px)',
      },
    },
  },
  plugins: [],
}