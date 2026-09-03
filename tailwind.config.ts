import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          blush: {
            50: '#FDF2F4',
            100: '#FCE7EC',
            200: '#FBCFE8',
            300: '#F472B6',
            400: '#EC4899',
            500: '#DB2777',
          },
          cream: '#FCFBF7',
          silver: {
            light: '#F1F5F9',
            DEFAULT: '#CBD5E1',
            dark: '#94A3B8',
          },
          bordeaux: {
            DEFAULT: '#4A1525',
            dark: '#380E1C',
          },
          charcoal: '#1E1B1E',
          sage: '#E2E8E2',
          lavender: '#EDE9FE',
          butter: '#FEF9C3',
        },
      },
      boxShadow: {
        scrapbook: '0 8px 24px -4px rgba(244, 114, 182, 0.12), 0 4px 8px -2px rgba(30, 27, 30, 0.04)',
        polaroid: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        sticker: '0 2px 0 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        digicam: 'inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cursive: ['var(--font-cursive)', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
