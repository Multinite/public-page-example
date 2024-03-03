import multiniteThemePlugin, {
  MultiniteThemeOptions,
} from "./src/api/multiniteThemePlugin";
import type { Config } from "tailwindcss";

//? Change these values to match your project's needs.
//? We recommend having anything not needed disabled to reduce CSS bundle size.
export const multiniteThemeOptions: MultiniteThemeOptions = {
  colors: {
    primary: true, // primary color
    secondary: true, // secondary color
    danger: true, // danger color
    foreground: true, // foreground color
    background: true, // background color
    warning: true, // warning color
    success: false, // success color
    default: true, // default color
    content1: true, // content1 color
    content2: true, // content2 color
    content3: true, // content3 color
    content4: true, // content4 color
    focus: true, // focus modififier color
    divider: true, // divider color (eg: for borders)
    overlay: true, // overlay color (eg: for modals)
  },
  opacity: {
    disabledOpacity: true, // disabled opacity (eg: for buttons)
  },
  borderRadius: {
    radius: true, // radius (eg: for buttons)
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
  darkMode: 'class',
  plugins: [multiniteThemePlugin(multiniteThemeOptions)],
};
export default config;
