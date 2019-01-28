const config = require('config');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackMerge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ComConf = require('./webpack.common');

module.exports = WebpackMerge(ComConf, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: config.path.dist,
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[id].css',
      orderWarning: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              'react-hot-loader/babel',
              'transform-decorators-legacy',
              'add-module-exports'
            ]
          }
        }
      ]
    })
  ]
});
