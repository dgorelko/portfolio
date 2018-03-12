const path = require('path');

module.exports = function() {
  return {
    // Settings for webpack-dev-server
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      open: true,
      stats: 'errors-only',
      watchContentBase: true,
      port: 8080
    }
  };
};