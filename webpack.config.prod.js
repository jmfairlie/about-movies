const common = require('./webpack.config.common.js');

module.exports = {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );

            // npm package names are URL-safe, but some servers don't like @ symbols
            return packageName?`npm.${packageName[1].replace('@', '')}`:module.buildInfo.hash;
          }
        }
      }
    }
  },
  ...common
};
