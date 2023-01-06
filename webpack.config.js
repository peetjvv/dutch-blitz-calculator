/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = env => {
  const isDevServer = !!env.development;

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.modernizrrc(\.json)?$/,
          use: ['modernizr-loader', 'json-loader'],
        },
        {
          test: /\.scss/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      // alias: {
      //   settings: path.resolve(
      //     isDevServer ? './src/settings.dev' : './src/settings.prod'
      //   ),
      // },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        favicon: './src/favicon.ico',
      }),
      !isDevServer
        ? new WorkboxPlugin.GenerateSW({
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
          })
        : null,
    ].filter(plugin => !!plugin),
    devServer: {
      historyApiFallback: true,
    },
    devtool: 'source-map',
  };
};
