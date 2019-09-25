const config = require("craco-config-flex-plugin");

module.exports = {
  ...config,
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
          webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
            plugin => plugin.constructor.name !== "ModuleScopePlugin"
          );

          if (env === "production")
            webpackConfig.output.filename =
              "jabra-twilio-call-control-plugin.js";

          return webpackConfig;
        }
      }
    }
  ]
};
