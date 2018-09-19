import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'

import Vue from 'vue'
import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'

import Lang from '@components/select-lang'
import router from '@appBase/router'
import store from "@store"

import app from './main.vue'

import Config from './config'
import Api from './api'
import Fun from './function'


//执行install方法
Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)

//Vue中的全局变量通过Vue.prototype实现
Vue.prototype.$Api = Api
Vue.prototype.$Config = Config
Vue.prototype.$Func = Fun


new Vue({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(app)
})