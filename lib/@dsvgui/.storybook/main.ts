/** @type { import('@storybook/nextjs').StorybookConfig } */

import webpack from "webpack";

const defaultConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config, { isServer }) => {
    config.resolve.fallback.fs = false;
    config.plugins.push(
      new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] })
    );
    return config;
  },
};
export default defaultConfig;
