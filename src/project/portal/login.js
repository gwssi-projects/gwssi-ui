import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import Css from './login.less';
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'

import Vue from 'vue'
import VueMeta from 'vue-meta'

import ElementUI from 'element-ui'

import Lang from '@components/select-lang'
import app from './login.vue'
import store from "@store"

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)

new Vue({
  i18n,
  store,
  el: '#app',
  render: h => h(app)
})