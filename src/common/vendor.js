//vendor.js会将引入的所有公共模块统一打包 其它ja中import相同模块则不再单独打入，减少JS体积
//核心包
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import ElementUI from 'element-ui'

//语言包
import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

import gwssiEnLocale from '../common/lib/locale/lang/en.js'
import gwssiZhLocale from '../common/lib/locale/lang/zh-CN.js'

//require 和 import , ES6建议全部使用 import
//const merge = require('webpack-merge')
//webpack-merge类似jquery的extends 合并对象
import merge from 'webpack-merge'

Vue.use(VueI18n)
//语言合并
const en = merge(enLocale, gwssiEnLocale)
const cn = merge(zhLocale, gwssiZhLocale)

const messages = {
    en: en,
    "zh-cn": cn
}

//初始语言
const i18n = new VueI18n({
    locale: 'zh-cn',
    messages,
})

//注册全局对象
window.i18n = i18n;

//语言组件 
//如果直接在公共js引入会因为执行顺序找不到 window.i18n对象
//import Lang from '../common/components/select-lang'