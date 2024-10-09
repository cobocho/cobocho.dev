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
      },
      width: {
        'content-limit': '1200px',
      },
      screens: {
        desktop: {
          min: '800px',
        },
        mobile: {
          max: '799px',
        },
      },
      boxShadow: {
        inner: '',
      },
    },
  },
  plugins: [],
}
export default config
