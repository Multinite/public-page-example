import plugin from "tailwindcss/plugin";

export default plugin.withOptions(
  function (options = {}) {
    return function ({}) {};
  },
  function (options) {
    function generateColorValues(color: string) {
      return {
        DEFAULT: `var(--nextui-${color})`,
        foreground: `var(--nextui-${color}-foreground)`,
        50: `var(--nextui-${color}-50)`,
        100: `var(--nextui-${color}-100)`,
        200: `var(--nextui-${color}-200)`,
        300: `var(--nextui-${color}-300)`,
        400: `var(--nextui-${color}-400)`,
        500: `var(--nextui-${color}-500)`,
        600: `var(--nextui-${color}-600)`,
        700: `var(--nextui-${color}-700)`,
        800: `var(--nextui-${color}-800)`,
        900: `var(--nextui-${color}-900)`,
      } as const;
    }

    return {
      theme: {
        colors: {
          primary: generateColorValues("primary"),
          secondary: generateColorValues("secondary"),
          danger: generateColorValues("danger"),
          warning: generateColorValues("warning"),
          foreground: generateColorValues("foreground"),
          background: generateColorValues("background"),
          success: generateColorValues("success"),
          default: generateColorValues("default"),
          content1: "var(--nextui-content1)",
          "content1-foreground": "var(--nextui-content1-foreground)",
          content2: "var(--nextui-content2)",
          "content2-foreground": "var(--nextui-content2-foreground)",
          content3: "var(--nextui-content3)",
          "content3-foreground": "var(--nextui-content3-foreground)",
          content4: "var(--nextui-content4)",
          "content4-foreground": "var(--nextui-content4-foreground)",
          focus: "var(--nextui-focus)",
          divider: "var(--nextui-divider)",
          overlay: "var(--nextui-overlay)",
        },
        borderRadius: {
          small: "var(--nextui-radius-small)",
          medium: "var(--nextui-radius-medium)",
          large: "var(--nextui-radius-large)",
        },
        opacity: {
          disabled: "var(--nextui-disabled-opacity)",
        },
      },
    };
  }
);
