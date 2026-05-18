import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          1: '#FF6FA7',
          2: '#FF9BC1',
          3: '#FFD1E0',
          4: '#FFE9F1',
          5: '#FFF5F8',
        },
      },
    },
  },
  plugins: [require('daisyui')],
} as any

export default config