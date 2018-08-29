var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  //系统JS的全局对象
  //开发环境  需要使用双重引号或者获取的时候使用JSON.stringify，否则会出错
  NODE_ENV: '"development"',
  DOMAIN: '""'
})

