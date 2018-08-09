const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
    //公共组件（不会经常变更）
    vendor: './src/common/vendor.js',

    //首页和DEMO
    index: './src/main.js',
    //多个引入的例子
    //'user':['./src/login.js','./src/reg.js'],
    "demo/elementUIDemo": './src/demo/elementUIDemo.js'

    //common

    //project
    //iptrm

  },
  output: {
    //输出的目录,所有JS和通过HtmlWebpackPlugin生成的HTML以及静态资源文件
    path: resolve(__dirname, 'dist'),
    //编译生成的js文件,如果不是dev模式则生成带hash码的js，可以设置路径比如 js/[name].js
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    /* * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件 * 
    比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件 * 
    只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')}) * 
    或者这样require.ensure(['./greeter'],function(require){alert(11);}) * 
    chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变 * 
    注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取 * */
    chunkFilename: '[id].js?[chunkhash]',
    //HTML和CSS中的资源文件路径的补全 包括css中的图片 和html中引入的JS等 比如 <script type="text/javascript" src="/assets/vendor.js"> 
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    },
    {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }
    ]
  },
  plugins: [
    //重复引用的公共组件 会打包成 /assets/manifest.js /assets/vendor.js 将第三方包分离
    //减少其他JS引入相同公共组件后会重复打包的问题（如果没有配置CommonsChunkPlugin，会在自己的JS中打入第三方库的JS包）
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/index.html',
      template: 'src/index.html',
      //设置引入的JS，如果不设置默认会加载全部的JS
      chunks: ['manifest', 'vendor', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/demo/elementUIDemo.html',
      template: 'src/demo/elementUIDemo.html',
      chunks: ['manifest', 'vendor', 'demo/elementUIDemo']
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
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
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  //用于调试 控制是否生成，以及如何生成 Source Map。用于对应到源码的行号。
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
