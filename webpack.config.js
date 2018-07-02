'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// NODE ENV
const isProduction = process.argv.includes('--env.production');

module.exports = {
  name: 'app',

  context: __dirname,

  entry: ['babel-polyfill', path.resolve(__dirname, 'src/app.js')],

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json']
  },

  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: '[name].min.js'
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '../css/[name].css',
      allChunks: true
    }),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/static'),
      to: path.resolve(__dirname, 'public/static')
    }]),

    ...(isProduction
      ? [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: false,
            unused: true,
            dead_code: true
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        })
      ]
      : [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    )
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[hash:8].[ext]',
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },

  devtool: isProduction ? 'source-map' : 'cheap-module-inline-source-map',

  node: {
    net: 'empty',
    fs: 'empty'
  },

  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: !isProduction,
    timings: true,
    version: false
  }

};