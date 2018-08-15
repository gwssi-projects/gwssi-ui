// ShellJS 是 Node.js 扩展，用于实现 Unix shell 命令执行，支持 Windows。
require('shelljs/global')
env.NODE_ENV = 'production'

var webpackConfig = require('./webpack.prod.conf')

module.exports = webpackConfig
