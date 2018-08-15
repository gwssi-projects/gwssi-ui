const webpack = require('webpack')
const merge = require('webpack-merge')

var baseWebpackConfig = require('./webpack.base.conf')
var config = require('../config')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]

})

module.exports = webpackConfig
