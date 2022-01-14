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
};
