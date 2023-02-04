const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.config.common.js');

module.exports = {
  mode: 'development',
  devServer: {
    compress: true,
    server: 'http',
    port: 9000,
    historyApiFallback: {
      index: '/'
    },
  },
  stats: {
    errorDetails: true
  },
  ...common
};
