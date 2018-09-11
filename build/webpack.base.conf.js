const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

var config = require('../config')

module.exports = {

  entry: {
    //公共组件（不会经常变更）
    vendor: './src/common/vendor.js',

    //首页
    index: './src/main.js',
    //多个引入的例子
    //'user':['./src/login.js','./src/reg.js'],

    //project
    //base ui
    "project/base/baseUIIndex": './src/project/base/main.js'

    //iptrm

  },

  output: {
    //输出的目录,所有JS和通过HtmlWebpackPlugin生成的HTML以及静态资源文件
    path: config.build.assetsRoot,
    //编译生成的js文件,如果不是dev模式则生成带hash码的js，可以设置路径比如 js/[name].js
    filename: process.env.NODE_ENV === 'production' ? '[name].js?[chunkhash]' : '[name].js',
    // filename是主入口的文件名，chunkFilename是非主入口的文件名
    // filename应该比较好理解，就是对应于entry里面生成出来的文件名。比如：
    // {
    //     entry: {
    //         "index": "pages/index.jsx"
    //     },
    //     output: {
    //         filename: "[name].min.js",
    //         chunkFilename: "[name].min.js"
    //     }
    // }
    // 生成出来的文件名为index.min.js。
    // chunkname理解是未被列在entry中，却又需要被打包出来的文件命名配置。在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的，如使用CommonJS的方式异步加载模块：
    // require.ensure(["modules/tips.jsx"], function(require) {
    //     var a = require("modules/tips.jsx");
    //     // ...
    // }, 'tips');
    //   以及VUE使用的异步路由
    //   const logged = () =>
    //   import( /* webpackChunkName: "group-foo" */ '../page/logged')
    // const adminLogged = () =>
    //   import( /* webpackChunkName: "group-foo" */ '../page/adminLogged')
    // const subRouter = () =>
    //   import( /* webpackChunkName: "group-foo" */ '../page/subRouter')
    // const comAuth = () =>
    //   import( /* webpackChunkName: "group-foo" */ '../page/comAuth')
    // 异步加载的模块是要以文件形式加载，所以这时生成的文件名是以chunkname配置的，上述modules/tips.jsx生成出的文件名就是tips.min.js。
    // 如果使用ID的话就是根据 Chunks 生成 0.js 1.js这样
    // chunkFilename: '[id].js?[chunkhash]',
    //这里的name 通过上述的/* webpackChunkName: "group-foo" */配置
    chunkFilename: '[name].js?[chunkhash]',
    //JS和HTML编译后的主目录
    //HTML和CSS中的资源文件路径的补全 包括css中的图片 和html中引入的JS等 比如 <script type="text/javascript" src="/assets/vendor.js"> 
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
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
      // {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader'
        ]
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
    //CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长。
    //重复引用的公共组件 会打包成 /manifest.js /vendor.js 将第三方包分离
    //减少其他JS引入相同公共组件后会重复打包的问题（如果没有配置CommonsChunkPlugin，会在自己的JS中打入第三方库的JS包）
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new HtmlWebpackPlugin({
      title: '长城软件基础UI组件及应用项目',
      filename: resolve(__dirname, '../dist/index.html'),
      template: resolve(__dirname, '../src/index.html'),
      //设置引入的JS，如果不设置默认会加载全部的JS
      chunks: ['manifest', 'vendor', 'index']
    }),
    //基础组件首页
    new HtmlWebpackPlugin({
      title: '长城软件基础UI组件及应用项目',
      filename: resolve(__dirname, '../dist/project/base/index.html'),
      template: resolve(__dirname, '../src/project/base/index.html'),
      chunks: ['manifest', 'vendor', 'project/base/baseUIIndex']
    }),
    // 直接复制静态文件
    new CopyWebpackPlugin([{
      from: resolve(__dirname, '../static/'),
      to: resolve(__dirname, '../dist/static/'),
      ignore: ['.*']
    }])
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/common/components'),
      '@lib': resolve(__dirname, '../src/common/lib'),
      '@mock': resolve(__dirname, '../src/common/mock'),
      '@store': resolve(__dirname, '../src/common/store'),
      '@types': resolve(__dirname, '../src/common/types'),

      '@appBase': resolve(__dirname, '../src/project/base'),
      '@appPortal': resolve(__dirname, '../src/project/portal'),

      '@config': resolve(__dirname, '../config'),
      '@static': resolve(__dirname, '../static'),
      vue: 'vue/dist/vue.js'
    },
    //路径优化，即Hello.vue这个组件我们不需要添加.vue后缀就可以引用到了，如果不用extensions， 我们就必须要用@components/Hello.vue来引入这个文件。 
    extensions: ['.js', '.vue', '.json', '.css', '.d.ts']
  },
}