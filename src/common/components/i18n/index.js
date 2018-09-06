import Vue from 'vue'
import VueI18n from 'vue-i18n'

//elementUI语言包
import { use } from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

import gwssiEnLocale from '@lib/locale/lang/en.js'
import gwssiZhLocale from '@lib/locale/lang/zh-CN.js'

//require 和 import , ES6建议全部使用 import
//const merge = require('webpack-merge')
//webpack-merge类似jquery的extends 合并对象
// import merge from 'webpack-merge'
import tools from "@components/tools";

//store对象
import store from '@store'

Vue.use(VueI18n)
//语言合并
const en = tools.objectMerge(enLocale, gwssiEnLocale)
const cn = tools.objectMerge(zhLocale, gwssiZhLocale)

const messages = {
  en: en,
  "zh-cn": cn
}

var lang = store.getters.language
store.dispatch('setLanguage', lang);

//初始语言
const i18n = {

  //用于更新elementui中的语言包
  eleLocale: function (lang) {
    use(lang == 'zh-cn' ? zhLocale : enLocale)
  },

  vueLocale: new VueI18n({
    locale: lang,
    messages,
  })

}

i18n.eleLocale(lang);
export default i18n