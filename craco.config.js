const config = require("craco-config-flex-plugin");

module.exports = {
  ...config,
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
          if (env === "production")
            webpackConfig.output.filename = "plugin-jabra-call-control.js";

          return webpackConfig;
        }
      }
    }
  ]
};
