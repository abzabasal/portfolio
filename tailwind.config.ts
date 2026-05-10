import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
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
        // Bitstream Noir palette — driven by CSS variables so values flip with theme.
        // See app/globals.css for the actual hex values per theme.
        noir: {
          bg: "hsl(var(--noir-bg) / <alpha-value>)",
          surface: "hsl(var(--noir-surface) / <alpha-value>)",
          "surface-dim": "hsl(var(--noir-surface-dim) / <alpha-value>)",
          "surface-1": "hsl(var(--noir-surface-1) / <alpha-value>)",
          "surface-2": "hsl(var(--noir-surface-2) / <alpha-value>)",
          "surface-3": "hsl(var(--noir-surface-3) / <alpha-value>)",
          "surface-4": "hsl(var(--noir-surface-4) / <alpha-value>)",
          line: "hsl(var(--noir-line) / <alpha-value>)",
          "line-strong": "hsl(var(--noir-line-strong) / <alpha-value>)",
          outline: "hsl(var(--noir-outline) / <alpha-value>)",
          text: "hsl(var(--noir-text) / <alpha-value>)",
          "text-soft": "hsl(var(--noir-text-soft) / <alpha-value>)",
          "text-mute": "hsl(var(--noir-text-mute) / <alpha-value>)",
          "text-faint": "hsl(var(--noir-text-faint) / <alpha-value>)",
          accent: "hsl(var(--noir-accent) / <alpha-value>)",
          "accent-bright": "hsl(var(--noir-accent-bright) / <alpha-value>)",
          "accent-soft": "hsl(var(--noir-accent-soft) / <alpha-value>)",
          "accent-deep": "hsl(var(--noir-accent-deep) / <alpha-value>)",
          // Theme-aware CTA: obsidian on light, pale cyan on dark
          cta: "hsl(var(--noir-cta-bg) / <alpha-value>)",
          "cta-fg": "hsl(var(--noir-cta-fg) / <alpha-value>)",
          "cta-edge": "hsl(var(--noir-cta-edge) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Stellar Blueprint typography:
        //   display → Space Grotesk (geometric, "engineered" feel)
        //   sans (body) → Manrope (humanist, neutral)
        //   mono → JetBrains Mono (developer code)
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-caps": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "700" }],
        "code-sm": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      spacing: {
        "section-gap": "8rem",
        "container-max": "1200px",
        gutter: "1.5rem",
      },
      boxShadow: {
        "noir-glow": "var(--shadow-noir-glow)",
        "noir-lift": "var(--shadow-noir-lift)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config

export default config
