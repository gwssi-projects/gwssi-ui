const webpack = require('webpack')
const merge = require('webpack-merge')
const url = require('url')

var baseWebpackConfig = require('./webpack.base.conf')
var config = require('../config')

var env = config.dev.env

var webpackConfig = merge(baseWebpackConfig, {

    devServer: {
        host: '127.0.0.1',
        port: config.dev.port,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: url.parse('/assets/').pathname
        }
    },
    //用于调试 控制是否生成，以及如何生成 Source Map。用于对应到源码的行号。
    //eval-source-map 适合开发，source-map 适合线上环境
    //devtool: '#source-map'
    //代码需要调试的地方增加  debugger 即可
    devtool: '#eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        })
    ]

})

module.exports = webpackConfig
