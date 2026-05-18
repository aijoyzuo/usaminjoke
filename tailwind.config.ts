import type { Config } from 'tailwindcss'

const config = {
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
  daisyui: {
    themes: [
      {
        usaminjoke: {
          "primary": "#FF6FA7",
          "primary-content": "#ffffff",
          "secondary": "#FF9BC1",
          "accent": "#FFD1E0",
          "neutral": "#666666",
          "base-100": "#FFF5F8",
          "base-200": "#FFE9F1",
          "base-300": "#FFD1E0",
          "base-content": "#1A1A1A",
        },
      },
    ],
  },
} satisfies Config  // ← 把 : Config 改成 satisfies Config

export default config