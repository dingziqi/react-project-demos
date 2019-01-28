const path = require('path');
const config = require('config');
const WebpackBar = require('webpackbar');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const util = require('./util');

const { root, dist, html } = config.path;

module.exports = {
  entry: path.resolve(root, 'client/index.jsx'),
  output: {
    path: dist,
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[name]-[hash].js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader'
      },
      {
        test: /\.(less|css)$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: html,
      filename: path.join(dist, './index.html')
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          minChunks: 2
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: util.getAlias(
      {
        '~imgs': 'client/static/imgs',
        '~components': 'client/components',
        '~styles': 'client/styles',
        '~utils': 'client/utils'
      },
      root
    )
  }
};
