import type {Config} from "tailwindcss";
import {withUt} from "uploadthing/tw";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "#382039",
        secondary: "#200f21",
        light: "#5a3d5c",
        button1: "#f638dc"
      },
    },
  },
  plugins: [],
}) satisfies Config;

