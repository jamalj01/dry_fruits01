/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E31B23',     // M&M Red
          yellow: '#FFF000',  // M&M Yellow
          blue: '#00629B',    // M&M Blue
          green: '#00A859',   // M&M Green
          orange: '#F26A36',  // M&M Orange
          cocoa: '#2C1A13',   // Dark Cocoa background/text
          cocoaLight: '#3E2A21',
          cocoaMuted: '#5C463C',
          cream: '#FFFDF9',   // Sweet cream background
        }
      },
      fontFamily: {
        heading: ['Fredoka', 'Lilita One', 'Lexend', 'sans-serif'],
        body: ['Inter', 'Lexend', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 4px 12px rgba(44, 26, 19, 0.08)',
        'DEFAULT': '0 8px 24px rgba(44, 26, 19, 0.12), 0 4px 12px rgba(44, 26, 19, 0.06)',
        'md': '0 16px 36px rgba(44, 26, 19, 0.16), 0 4px 12px rgba(44, 26, 19, 0.08)',
        'lg': '0 24px 48px rgba(44, 26, 19, 0.20), 0 8px 24px rgba(44, 26, 19, 0.10)',
        'xl': '0 32px 64px rgba(44, 26, 19, 0.24), 0 12px 32px rgba(44, 26, 19, 0.12)',
        '2xl': '0 40px 80px rgba(44, 26, 19, 0.28), 0 16px 40px rgba(44, 26, 19, 0.14)',
        'pill-red': '0 16px 36px -4px rgba(227, 27, 35, 0.35)',
        'pill-yellow': '0 16px 36px -4px rgba(255, 240, 0, 0.35)',
        'pill-blue': '0 16px 36px -4px rgba(0, 98, 155, 0.35)',
        'pill-green': '0 16px 36px -4px rgba(0, 168, 89, 0.35)',
        'pill-orange': '0 16px 36px -4px rgba(242, 106, 54, 0.35)',
        'pill-cocoa': '0 16px 36px -4px rgba(44, 26, 19, 0.22)',
        'pill-soft': '0 20px 48px -8px rgba(44, 26, 19, 0.12)',
        'tactile': '0 16px 32px -6px rgba(44, 26, 19, 0.15), 0 4px 12px -2px rgba(44, 26, 19, 0.08)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
