/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FAF9F7',
        secondary: '#FFFFFF',
        surface: '#F0EDE8',
        'surface-hover': '#E8E4DE',
        accent: '#D97706',
        'accent-hover': '#B45309',
        'accent-light': '#FEF3C7',
        'accent-subtle': '#FFFBEB',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6560',
        'text-muted': '#9B9590',
        'border-default': '#E8E4DE',
        'border-light': '#F0EDE8',
        success: '#059669',
        'success-light': '#D1FAE5',
        danger: '#DC2626',
        'danger-light': '#FEE2E2',
      },
      fontFamily: {
        'display': ['var(--font-display)', 'Georgia', 'serif'],
        'body': ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'pulse-warm': 'pulseWarm 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'nav': '0 1px 3px rgba(0,0,0,0.05)',
        'glow': '0 0 20px rgba(217, 119, 6, 0.15)',
      },
    },
  },
  plugins: [],
}
