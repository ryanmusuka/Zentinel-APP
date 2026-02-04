/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'zrp-navy': 'var(--zrp-navy)',
        'zrp-gold': 'var(--zrp-gold)',
        'zrp-red': 'var(--zrp-red)',
      },
      animation: {
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        }
      }
    },
  },
  plugins: [],
}

