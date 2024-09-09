import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../lib/tailwind/theme.css";
import { Toaster } from "@/lib/components/ui/toaster";

const preview: Preview = {
  parameters: {
    darkMode: {
      darkClass: "dark",
      lightClass: "light",
      stylePreview: true,
      dark: { ...themes.dark, appBg: "black", textColor: "white", textInverseColor: "black"},
      light: { ...themes.normal, appBg: "#f7fafc", textColor: "#1a202c", textInverseColor: "#f7fafc"},
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default preview;
