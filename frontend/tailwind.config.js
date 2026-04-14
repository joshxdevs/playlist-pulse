/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          50:  "#f1f1f1",
          100: "#dbdbdb",
          200: "#bababa",
          300: "#9d9d9d",
          400: "#838383",
          500: "#6b6b6b",
          600: "#545454",
          700: "#3f3f3f",
          800: "#2c2c2c",
          900: "#1a1a1a",
          950: "#000000",
        },
        accent: {
          DEFAULT: "#ef4444",
          hover:   "#dc2626",
          muted:   "rgba(239,68,68,0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in":    "fadeIn 0.25s ease-out",
        "slide-in":   "slideIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        "scale-in":   "scaleIn 0.2s ease-out",
        "progress":   "progressFill 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn:       { from: { opacity: "0" },                              to: { opacity: "1" } },
        slideIn:      { from: { transform: "translateX(-100%)" },            to: { transform: "translateX(0)" } },
        scaleIn:      { from: { transform: "scale(0.95)", opacity: "0" },   to: { transform: "scale(1)",    opacity: "1" } },
        progressFill: { from: { width: "0%" },                               to: { width: "var(--pw)" } },
      },
      boxShadow: {
        "card":   "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5)",
        "modal":  "0 25px 50px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
