const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./base.js');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = function () {
  return merge(base('development'), {
    mode: 'development',
    output: {
      publicPath: '/',
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      // 开发代理
      proxy: {
      },
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: 'Chrome > 70',
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        context: path.resolve(__dirname, '../../'),
        fix: true,
        extensions: ['js', 'vue'],
        lintDirtyModulesOnly: true,
        failOnError: false,
	  }),
    ],
  });
};
