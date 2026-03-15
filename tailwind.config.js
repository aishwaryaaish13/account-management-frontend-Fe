/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      animation: {
        'fade-up':   'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':   'fadeIn 0.4s ease both',
        'pop':       'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'shimmer':   'shimmer 2s linear infinite',
        'float':     'float 3s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity:'0', transform:'translateY(28px) scale(0.97)' }, to: { opacity:'1', transform:'translateY(0) scale(1)' } },
        fadeIn:   { from: { opacity:'0', transform:'translateY(10px)' },             to: { opacity:'1', transform:'translateY(0)' } },
        pop:      { from: { opacity:'0', transform:'scale(0.8) rotate(-8deg)' },     to: { opacity:'1', transform:'scale(1) rotate(0deg)' } },
        shimmer:  { from: { backgroundPosition:'200% center' },                      to: { backgroundPosition:'-200% center' } },
        float:    { '0%,100%': { transform:'translateY(0)' },                        '50%': { transform:'translateY(-8px)' } },
        pulseDot: { '0%,100%': { opacity:'1', transform:'scale(1)' },                '50%': { opacity:'0.5', transform:'scale(0.8)' } },
      },
      backgroundSize: { '300%': '300%' },
    },
  },
  plugins: [],
};
