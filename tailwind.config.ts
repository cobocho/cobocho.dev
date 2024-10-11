/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        outline: '#1c1c1c',
        background: '#ffffff',
        border: '#e1e1e1',
        content: '#1c1c1c',
      },
      width: {
        'content-limit': '900px',
        toc: '260px',
      },
      screens: {
        desktop: {
          min: '1500px',
        },
        tablet: {
          max: '1499px',
          min: '1000px',
        },
        mobile: {
          max: '999px',
        },
      },
      boxShadow: {
        inner: '',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
