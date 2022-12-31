const { merge } = require('webpack-merge');
const base = require('./base.js');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = function () {
  return merge(base(), {
    mode: 'production',
    output: {
      publicPath: '/',
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[id].[contenthash].js',
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 5,
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'webpack_report.html',
        openAnalyzer: false,
      }),
    ],
  });
};
