const fs = require('fs');
const config = require('config');
const semver = require('semver');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackMerge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ComConf = require('./webpack.common');

const nvmrc = fs.readFileSync('.nvmrc', 'utf8');
if (semver.satisfies(process.version, `<${nvmrc}`)) {
  throw Error(
    `you should use node@${nvmrc} for this project, current node version is ${
      process.version
    }`
  );
}

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
