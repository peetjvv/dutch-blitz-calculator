import path from 'path';
import webpack from 'webpack';
import WorkboxPlugin from 'workbox-webpack-plugin';
import baseConfig from './webpack.config';

const config: webpack.Configuration = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    ...(baseConfig.plugins || []),
    new WorkboxPlugin.GenerateSW({
      // See webpack guide to set up offline apps: https://webpack.js.org/guides/progressive-web-application/
      // See list of available options: https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-GenerateSWOptions
      //
      // These options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around.
      clientsClaim: true,
      skipWaiting: true,
      // Increase maximum file size to cache so that we can cache dev build bundle.js files
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
      // Set fallback so that loading subpages without navigating in the app will load that page. SPA stuff.
      navigateFallback: '/index.html',
    }),
  ],
};

export default config;
