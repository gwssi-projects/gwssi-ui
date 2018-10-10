import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'
import Css from './main.less';
import Icon from '@appPortal/fonts/css/font-awesome.min.css';

import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'

import Lang from '@components/select-lang'
import GwTheme from "@components/theme/";
import store from "@store"
import router from './router'
import tools from "@components/tools";

import app from './App'

import Config from '@appPortal/config'
import Fun from '@appPortal/function'

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)
Vue.use(GwTheme);

//Vue中的全局变量通过Vue.prototype实现
Vue.prototype.$Config = Config
Vue.prototype.$Func = Fun

new Vue({
  i18n,
  store,
  router,
  el: '#app',
  render: h => h(app)
})