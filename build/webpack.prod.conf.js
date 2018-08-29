const webpack = require('webpack')
const merge = require('webpack-merge')

var baseWebpackConfig = require('./webpack.base.conf')
var config = require('../config')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {

  plugins: [
    new webpack.DefinePlugin({
      //设置环境变量 process.env
      'process.env': env
    })
  ]

})

module.exports = webpackConfig
