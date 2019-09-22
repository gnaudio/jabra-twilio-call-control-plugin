const config = require("craco-config-flex-plugin");

module.exports = {
  ...config,
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.output.filename = "plugin-jabra-call-control.js";

          return webpackConfig;
        }
      }
    }
  ]
};
