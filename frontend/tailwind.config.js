/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6d28d9",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e1b4b",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#9333ea",
          foreground: "#ffffff",
        },
        background: "#020617",
        foreground: "#f8fafc",
        card: "#0f172a",
        border: "#1e293b",
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
    },
  },
  plugins: [],
}
