import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import Css from './main.less';
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'

import Vue from 'vue'
import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'

import Lang from '@components/select-lang'
import router from '@appBase/router'
import '@mock'
import store from "@store"

import app from './main.vue'

//执行install方法
Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)

// import Vue from 'vue'
// import ElStep from 'element-steps'
// Vue.use(ElStep)

// or

// import Vue from 'vue'
// import ElStep from 'element-steps'
// Vue.component('el-step', ElStep)

new Vue({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(app)
})