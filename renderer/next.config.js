const path = require("path");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins.push(new WindiCSSWebpackPlugin());
    if (!isServer) {
      config.target = "electron-renderer";
      config.node = {
        __dirname: true,
      };
    }

    return config;
  },
  images: {
    domains: ["pay-test-passport.66rpg.com"],
    loader: "imgix",
    path: "https://pay-test-www.66rpg.com",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "renderer/styles")],
  },
};
