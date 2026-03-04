import type { Config } from "tailwindcss";

const config: Config = {
  // ✅ This is the critical line — tells Tailwind to use the
  // 'dark' CSS class on <html> to enable dark: prefixes
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};

export default config;