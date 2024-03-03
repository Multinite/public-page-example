import plugin from "tailwindcss/plugin";

export type MultiniteThemeOptions = {
  colors: {
    primary: boolean;
    secondary: boolean;
    danger: boolean;
    foreground: boolean;
    background: boolean;
    warning: boolean;
    success: boolean;
    default: boolean;
    content1: boolean;
    content2: boolean;
    content3: boolean;
    content4: boolean;
    focus: boolean;
    divider: boolean;
    overlay: boolean;
  };
  opacity: {
    disabledOpacity: boolean;
  };
  borderRadius: {
    radius: boolean;
  };
};

export default plugin.withOptions(
  function (options: MultiniteThemeOptions) {
    return function ({}) {};
  },
  function (
    options: MultiniteThemeOptions = {
      colors: {
        primary: false,
        secondary: false,
        danger: false,
        warning: false,
        background: false,
        success: false,
        foreground: false,
        default: false,
        content1: false,
        content2: false,
        content3: false,
        content4: false,
        focus: false,
        divider: false,
        overlay: false,
      },
      opacity: {
        disabledOpacity: false,
      },
      borderRadius: {
        radius: false,
      },
    }
  ) {
    function generateColorValues(color: string) {
      return {
        DEFAULT: `hsl(var(--nextui-${color}))`,
        foreground: `hsl(var(--nextui-${color}-foreground))`,
        50: `hsl(var(--nextui-${color}-50))`,
        100: `hsl(var(--nextui-${color}-100))`,
        200: `hsl(var(--nextui-${color}-200))`,
        300: `hsl(var(--nextui-${color}-300))`,
        400: `hsl(var(--nextui-${color}-400))`,
        500: `hsl(var(--nextui-${color}-500))`,
        600: `hsl(var(--nextui-${color}-600))`,
        700: `hsl(var(--nextui-${color}-700))`,
        800: `hsl(var(--nextui-${color}-800))`,
        900: `hsl(var(--nextui-${color}-900))`,
      } as const;
    }

    function generateContentColorValues(color: string) {
      return {
        DEFAULT: `hsl(var(--nextui-${color}))`,
        foreground: `hsl(var(--nextui-${color}-foreground))`,
      } as const;
    }

    function generateBasicColorValues(color: string) {
      return {
        DEFAULT: `hsl(var(--nextui-${color}))`,
      } as const;
    }

    const borderRadiusStyles = options.borderRadius.radius
      ? {
          borderRadius: {
            small: "var(--nextui-radius-small)",
            medium: "var(--nextui-radius-medium)",
            large: "var(--nextui-radius-large)",
          },
        }
      : {};

    const opacityStyles = options.opacity.disabledOpacity
      ? {
          opacity: {
            disabled: "var(--nextui-disabled-opacity)",
          },
        }
      : {};

    const result = {
      theme: {
        colors: {
          primary: options.colors.primary ? generateColorValues("primary") : {},
          secondary: options.colors.secondary
            ? generateColorValues("secondary")
            : {},
          danger: options.colors.danger ? generateColorValues("danger") : {},
          warning: options.colors.warning ? generateColorValues("warning") : {},
          foreground: options.colors.foreground
            ? generateColorValues("foreground")
            : {},
          background: options.colors.background
            ? generateColorValues("background")
            : {},
          success: options.colors.success ? generateColorValues("success") : {},
          default: options.colors.default ? generateColorValues("default") : {},
          content1: options.colors.content1
            ? generateContentColorValues("content1")
            : {},
          content2: options.colors.content2
            ? generateContentColorValues("content2")
            : {},
          content3: options.colors.content3
            ? generateContentColorValues("content3")
            : {},
          content4: options.colors.content4
            ? generateContentColorValues("content4")
            : {},
          focus: options.colors.focus ? generateBasicColorValues("focus") : {},
          divider: options.colors.danger
            ? generateBasicColorValues("divider")
            : {},
          overlay: options.colors.overlay
            ? generateBasicColorValues("overlay")
            : {},
        },
        ...borderRadiusStyles,
        ...opacityStyles,
      },
    };

    return result;
  }
);
