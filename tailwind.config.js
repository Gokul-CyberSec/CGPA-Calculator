/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pathTriangle": {
          "33%": { "stroke-dashoffset": "74" },
          "66%": { "stroke-dashoffset": "147" },
          "100%": { "stroke-dashoffset": "221" },
        },
        "dotTriangle": {
          "33%": { transform: "translate(0, 0)" },
          "66%": { transform: "translate(10px, -18px)" },
          "100%": { transform: "translate(-10px, -18px)" },
        },
        "pathRect": {
          "25%": { "stroke-dashoffset": "64" },
          "50%": { "stroke-dashoffset": "128" },
          "75%": { "stroke-dashoffset": "192" },
          "100%": { "stroke-dashoffset": "256" },
        },
        "dotRect": {
          "25%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(18px, -18px)" },
          "75%": { transform: "translate(0, -36px)" },
          "100%": { transform: "translate(-18px, -18px)" },
        },
        "pathCircle": {
          "25%": { "stroke-dashoffset": "125" },
          "50%": { "stroke-dashoffset": "175" },
          "75%": { "stroke-dashoffset": "225" },
          "100%": { "stroke-dashoffset": "275" },
        },
        "dotCircle": {
          "25%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(18px, -18px)" },
          "75%": { transform: "translate(0, -36px)" },
          "100%": { transform: "translate(-18px, -18px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pathTriangle": "pathTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "dotTriangle": "dotTriangle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "pathRect": "pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "dotRect": "dotRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "pathCircle": "pathCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
        "dotCircle": "dotCircle 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite",
      },
    },
  },
  plugins: [],
}
