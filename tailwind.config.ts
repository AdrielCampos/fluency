import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
        },
        foreground: 'var(--color-foreground)',
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
          foreground: 'var(--color-success-foreground)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          light: 'var(--color-danger-light)',
          foreground: 'var(--color-danger-foreground)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          light: 'var(--color-info-light)',
          foreground: 'var(--color-info-foreground)',
        },
      },
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translate(-50%, var(--custom-translate)) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, var(--custom-translate)) rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        wave: 'wave 5s linear infinite',
        waveSlow: 'wave 10s linear infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
