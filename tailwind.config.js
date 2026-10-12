/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyprus: {
          DEFAULT: '#142a4a',
          deep: '#0d1c33',
          deepest: '#0f2240',
          soft: '#214070',
          bloom: '#3a5e9c',
        },
        sand: {
          DEFAULT: '#eef0f4',
          shade: '#dde1ea',
          muted: '#a7b1c4',
          card: '#f4f6fa',
        },
        ink: {
          DEFAULT: '#131922',
          muted: '#495162',
          light: '#6b7280',
        },
        silver: '#cdd3d0',
        accent: {
          DEFAULT: '#e0a23c',
          blue: '#5aa9ff',
          glow: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['"Chillax"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Chillax"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        accent: ['"Chillax"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Chillax"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
