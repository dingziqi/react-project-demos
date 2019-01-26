const path = require('path');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const util = require('./util');

const root = path.resolve(__dirname, '../');
const rootPages = path.resolve(root, 'client/pages');
const rootDist = path.resolve(root, 'dist');
const pathHTML = path.resolve(root, 'client/template.html');

const { entry, entryHTML } = util.getEntry(rootPages, pathHTML, 'vendors');

module.exports = {
  entry,
  output: {
    path: rootDist,
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
    new ExtractCssChunks({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
      orderWarning: false
    })
  ].concat(entryHTML),
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
