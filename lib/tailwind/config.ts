const content = [
  "./index.html",
  "./lib/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];

const theme = {
  extend: {
 
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
    colors: {
      black: "#000",
      white: "#fff",
      brand: {
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49",
      },
      accent: {
        primary: "#f8fafc",
        secondary: "#757575",
        inverted: "#000000",
        success: "#065f46", // Green
        error: "#991b1b", // Red
        warning: "#ca8a04", // Yellow
        info: "#075985", // Blue
      },
      neutral: {
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      error: {
        100: "#ffe5e5",
        200: "#ffcccc",
        300: "#ff9999",
        400: "#ff6666",
        500: "#ef4444",
        600: "#e62626",
        700: "#cc1f1f",
        800: "#b31919",
        900: "#991313",
      },
    },
    spacing: {
      smallest: "0.125rem",
      smaller: "0.25rem",
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
      larger: "2rem",
      largest: "3rem",
      px: "1px",
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: any = ["tailwindcss-animate"];

export {
  content as defaultContent,
  theme as defaultTheme,
  plugins as defaultPlugins,
};
