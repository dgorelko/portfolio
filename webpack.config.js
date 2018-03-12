const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pug = require('./config/pug');
const scss = require('./config/scss');
const babel = require('./config/babel');
const extractCSS = require('./config/css.extract');
const css = require('./config/css');
const devServer = require('./config/devServer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const common = merge ([
  {
    entry: {
      'index': PATHS.source +'/views/pages/index/index.js',
      'blog': PATHS.source +'/views/pages/blog/blog.js',
    },

    output: {
      path: PATHS.dist,
      filename: './js/[name].js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source +'/views/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog', 'common'],
        template: PATHS.source +'/views/pages/blog/blog.pug'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
      })
    ],
  },
  pug(),
  babel()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge ([
      common,
      extractCSS()
    ]); 
  }
  if (env === 'development') {
    return merge([
      common,
      devServer(),
      scss(),
      css()
    ]);
  }
};