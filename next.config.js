const withPlugins = require("next-compose-plugins");

const withTM = require("next-transpile-modules")([
  "react-leaflet",
  "@react-leaflet/core",
]);

module.exports = withPlugins([
  [
    withTM,
    {
      future: {
        webpack5: true,
      },
    },
  ],
  [
    {
      cssLoaderOptions: {
        url: false,
      },
      onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 100,
      },
    },
  ],
]);
