const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const devMode = process.env.NODE_ENV === "development";

const publicPath = devMode?'/':'/about-movies/';

const plugins = devMode ? [] : [new MiniCssExtractPlugin()];

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname,  './src/assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },

      {
        test: /\.(css|scss)$/,
        use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: {
              filter: (url, resourcePath) => {
                return url[0] !== '/'
              },
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader?limit=1024']
      }
    ]
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new webpack.DefinePlugin({
      "process.env.__PUBLIC_PATH__": JSON.stringify(publicPath),
    })
  ]
};
