import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
    "storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      }
    },
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      resolve: {
        alias: [
          { find: /^@\/components\/(.*)/, replacement: path.resolve(__dirname, "../lib/components/$1") },
          { find: /^@\/utils\/(.*)/, replacement: path.resolve(__dirname, "../lib/utils/$1") },
          { find: /^@\/ui\/(.*)/, replacement: path.resolve(__dirname, "../lib/components/ui/$1") },
          { find: /^@\/assets\/(.*)/, replacement: path.resolve(__dirname, "../lib/assets/$1") },
          { find: /^@\/lib\/(.*)/, replacement: path.resolve(__dirname, "../lib/$1") },
          { find: /^@\/hooks\/(.*)/, replacement: path.resolve(__dirname, "../lib/hooks/$1") },
        ] 
      }
    });
  },
};
export default config;
