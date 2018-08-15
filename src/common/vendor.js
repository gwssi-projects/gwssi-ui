//核心包
import Vue from 'vue'
import ElementUI from 'element-ui'

//国际化相关 使用vue-i18n 5.x版本
import VueI18n from 'vue-i18n'

import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

import gwssiEnLocale from '../common/lib/locale/lang/en.js'
import gwssiZhLocale from '../common/lib/locale/lang/zh-CN.js'

//require 和 import , ES6建议全部使用 import
//const merge = require('webpack-merge')
//webpack-merge类似jquery的extends 合并对象
import merge from 'webpack-merge'

//语言合并
Vue.use(VueI18n)
Vue.config.lang = 'zh-cn'
const en = merge(enLocale, gwssiEnLocale)
const cn = merge(zhLocale, gwssiZhLocale)

//console.log(en);
//console.log(cn);

Vue.locale('zh-cn', cn)
Vue.locale('en', en)