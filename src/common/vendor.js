//vendor.js会将引入的所有公共模块统一打包 其它ja中import相同模块则不再单独打入，减少JS体积
//核心包
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import merge from 'webpack-merge'

//基础工具类
import tools from "../common/components/tools";

//语言包
import i18n from "../common/components/i18n";

//注册全局对象
window.gwI18n = i18n;
window.i18n = i18n.vueLocale;
window.gwTools = tools;

//语言组件 
//如果直接在公共js引入会因为执行顺序找不到 window.i18n对象
//import Lang from '../common/components/select-lang'