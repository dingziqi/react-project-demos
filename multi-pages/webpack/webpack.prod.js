const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ComConf = require('./webpack.common');
const { dist, root } = config.path;

module.exports = WebpackMerge(ComConf, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(dist, {
      root
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy', 'add-module-exports']
          }
        }
      ]
    })
  ]
});
