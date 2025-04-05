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
        secondary: "#301135",
        light: "#5a3d5c",
        button1: "#5c0d51",
          button2: "#871f78"
      },
    },
  },
  plugins: [],
}) satisfies Config;

