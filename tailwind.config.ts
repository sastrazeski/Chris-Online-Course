import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        muted: "#667085",
        line: "#EAECF0",
        brand: {
          50: "#ECFDF3",
          100: "#D1FADF",
          600: "#039855",
          700: "#027A48"
        }
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.1)"
      }
    }
  },
  plugins: []
};

export default config;
