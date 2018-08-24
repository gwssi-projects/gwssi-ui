import Vue from 'vue'
import VueI18n from 'vue-i18n'

//elementUI语言包
import { use } from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

import gwssiEnLocale from '../../lib/locale/lang/en.js'
import gwssiZhLocale from '../../lib/locale/lang/zh-CN.js'

//require 和 import , ES6建议全部使用 import
//const merge = require('webpack-merge')
//webpack-merge类似jquery的extends 合并对象
import merge from 'webpack-merge'

//基础工具类
import tools from "../tools";

Vue.use(VueI18n)
//语言合并
const en = merge(enLocale, gwssiEnLocale)
const cn = merge(zhLocale, gwssiZhLocale)

const messages = {
  en: en,
  "zh-cn": cn
}

//这部分可以通过浏览器来选择默认语言(第一次语言设置在初始化window.i18n的代码中进行)，这里首先通过参数和cookie判断语言
var lang = tools.getQueryString("language");
if (lang == null) {
  //debugger
  lang = tools.getCookie("content-language");
  //console.log("content-language = " + lang);
}

if (lang != null && lang != "") {
} else {
  lang = 'zh-cn';
}
//如果是多级域名，是需要设置domain的
tools.setCookie("content-language", lang, 100, "/");

//初始语言
const i18n = {

  //用于更新elementui中的语言包
  eleLocale: function (lang) {
    console.log("eleLocale=" + lang);
    use(lang == 'zh-cn' ? zhLocale : enLocale)
  },

  vueLocale: new VueI18n({
    locale: lang,
    messages,
  })

}

i18n.eleLocale(lang);
export default i18n