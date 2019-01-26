const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackMerge = require('webpack-merge');
const ComConf = require('./webpack.common');

module.exports = WebpackMerge(ComConf, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true,
    stats: 'none'
  },
  plugins: [
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1
    // }),
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
