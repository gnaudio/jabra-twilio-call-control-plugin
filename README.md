# Twilio Flex Jabra Control Plugin

This plugin allows you the control Twilio Flex using a Jabra headset.

## Installation

Download [plugin-jabra-call-control.js](https://github.com/gnaudio/jabra-twilio-call-control-plugin/releases/download/1.0.0-beta.1/plugin-jabra-call-control.js), take this file and upload it into the Assets part of your Twilio Runtime.

You can also use in your own plugin, start by installing it via NPM og similar

```
npm install flex-jabra-call-control
```

In your plugin's `index.js` file import the plugin

```
import "flex-jabra-call-control"
```

## Development

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of `jabra-twilio-call-control-plugin.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.