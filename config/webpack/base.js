const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const projectDir = path.resolve(__dirname, '../../');
const buildDir = path.join(projectDir, 'dist');


module.exports = function (env) {
  const isDev = env === 'development';

  const plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(projectDir, 'config/template.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
      favicon: path.resolve(__dirname, '../favicon.ico'),
    }),
  ];

  console.log('isDev-----------', isDev);
  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[name].[chunkhash].css',
      chunkFilename: isDev
        ? '[name].chunk.css'
        : 'css/[name].[chunkhash].chunk.css',
    }));
  }

  return {
    target: 'browserslist',
    entry: path.resolve(projectDir, './src/index.js'),
    output: {
      path: buildDir,
      filename: 'js/[name].js',
      chunkFilename: 'js/[id].js',
    },
    resolve: {
      alias: {
        '@': path.resolve(projectDir, 'src'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vuex?|vue-router)[\\/]/,
            name: 'vueWithRouter',
            chunks: 'all',
          },
        },
      },
    },
    externals: {},
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: [/.css$/],
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name]-[contenthash].[ext]',
          },
        },
        {
          test: /\.svg$/,
          type: 'asset/source',
          resourceQuery: /raw/,
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'fonts/[name]-[contenthash].[ext]',
          },
        },
        {
          test: /\.(xlsx|xls)$/,
          type: 'asset/resource',
          generator: {
            filename: 'template/[contenthash].[ext]',
          },
        },
      ],
    },
    plugins,
  };
};
