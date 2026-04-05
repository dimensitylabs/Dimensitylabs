import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'smoky-black': '#11120D',
        'olive-drab': '#565449',
        'bone': '#D8CFBC',
        'floral-white': '#FFFBF4',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        syne: ['var(--font-syne)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'ui': ['11px', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'cap': ['12px', { lineHeight: '1.5', letterSpacing: '0.06em' }],
        'body': ['15px', { lineHeight: '1.75' }],
        'h4': ['18px', { fontWeight: '600', letterSpacing: '0.01em' }],
        'h3': ['clamp(20px, 3vw, 32px)', { lineHeight: '1.3' }],
        'h2': ['clamp(28px, 4vw, 48px)', { lineHeight: '1.2' }],
        'h1': ['clamp(40px, 6vw, 64px)', { lineHeight: '1.1' }],
        'display': ['clamp(48px, 8vw, 80px)', { lineHeight: '1.0' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
        '5xl': '96px',
      },
      borderRadius: {
        DEFAULT: '3px',
        'sm': '2px',
        'md': '4px',
        'pill': '100px',
      },
      borderWidth: {
        DEFAULT: '1px',
        'half': '0.5px',
        '2': '2px',
      },
      maxWidth: {
        'container': '1160px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'slower': '400ms',
      },
    },
  },
  plugins: [],
}

export default config
