import { MultiniteThemeOptions } from "@/api/multiniteThemePlugin";
import type { Config } from "tailwindcss";

//? Change these values to match your project's needs.
//? We recommend having anything not needed disabled to reduce CSS bundle size.
export const multiniteThemeOptions: MultiniteThemeOptions = {
  colors: {
    primary: true, // primary color
    secondary: false, // secondary color
    danger: false, // danger color
    foreground: false, // foreground color
    background: false, // background color
    warning: false, // warning color
    success: false, // success color
    default: true, // default color
    content1: false, // content1 color
    content2: false, // content2 color
    content3: false, // content3 color
    content4: false, // content4 color
    focus: false, // focus modififier color
    divider: false, // divider color (eg: for borders)
    overlay: false, // overlay color (eg: for modals)
  },
  opacity: {
    disabledOpacity: false, // disabled opacity (eg: for buttons)
  },
  borderRadius: {
    radius: false, // radius (eg: for buttons)
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("./src/api/multiniteThemePlugin.ts")(multiniteThemeOptions),
  ],
};
export default config;
