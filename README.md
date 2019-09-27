# Twilio Flex Jabra Call Control Plugin

This plugin allows you to control Twilio Flex using a Jabra headset.

**Warning: This software is in BETA. The software can be considered unstable, possibly untested and might be updated at any time. Use at your own risk. If you want to use something stable, please await completion of our development and Q/A process.**

## Installation

Download [plugin-jabra-call-control.js](https://github.com/gnaudio/jabra-twilio-call-control-plugin/releases/download/1.0.0-beta.4/plugin-jabra-call-control.js), take this file and upload it into the Assets part of your Twilio Runtime.

You can also use it directly in your own plugin. If you haven't yet started your own Twilio Flex plugin, [get started here](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin). If you have started, start using this plugin by installing it with npm or similar:

```
npm install @gnaudio/twilio-flex-call-control-plugin
```

In your plugin's `index.js` file import the plugin

```
import { loadPlugin } from "flex-plugin";
import { Plugin } from "@gnaudio/twilio-flex-call-control-plugin";

loadPlugin(Plugin);
```

## Development

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Make a copy of `public/appConfig.example.js` rename it `public/appConfig.js`, in the file, fill in the `accountSid`, with your Twilio Flex `accountSid`.

Afterwards, install the dependencies by running:

```
npm install
```

When you make changes to the plugin code, make sure to run:

```
npm run build
```

Or run

```
npm run start
```

To start the build process in watch mode

Open a new terminal and change directory to example, and install packages:

```
cd example
npm install
```

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm run start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`.
When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex. You do that from the example folder.
Run the following command to start the bundling:

```bash
cd example
npm run build
```

Afterwards, you'll find a `build/` folder that contains a file with the name of `jabra-twilio-call-control-plugin.js`. Take this file and upload it into the Assets part of your Twilio Runtime.
And make a release on GitHub with said file.

To deploy to npm run:

```
npx np
```

And follow the onscreen instructions
