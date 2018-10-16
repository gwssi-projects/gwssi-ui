const webpack = require('webpack')
const merge = require('webpack-merge')

var baseWebpackConfig = require('./webpack.base.conf')
var config = require('../config')

var env = config.build.env
//环境变量中设置直接跳转的首页地址
//和配置一样 这里环境变量也需要使用双引号！！
var index = (process.env.GW_INDEX == null || process.env.GW_INDEX == '') ? '""' : process.env.GW_INDEX 
env['GW_INDEX'] = index;
console.log('当前环境变量' + JSON.stringify(env))


var webpackConfig = merge(baseWebpackConfig, {

  plugins: [
    new webpack.DefinePlugin({
      //设置环境变量 process.env
      'process.env': env
    })
  ]

})

module.exports = webpackConfig