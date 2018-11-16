import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'
import '../../../static/font_810232/iconfont.js'
import Css from './main.less';
import Icon from '@appPortal/fonts/css/font-awesome.min.css';

import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'

import Lang from '@components/select-lang'
import GwTheme from "@components/theme/";
import store from './store';
import router from './router'
import tools from "@components/tools";

import app from './App'

import Config from '@appPortal/config'
import Fun from '@appPortal/function'

//api和parseString设置必须放在这里 而不能单独放在login
//因为有的路由直接刷新页面可能触发不了login
//这类配置只有放在全局的JS中才可以
import api from "@/common/api";
var defaults = require("xml2js").defaults;
//这里不设置解析出来的全是数组
defaults[0.2].explicitArray = false;
// console.log('explicitArray' + defaults[0.1].explicitArray + defaults[0.2].explicitArray);
//完全使用protal登录
//这部分不直接修改api js中的地址是为了其它模块能正常模拟使用，如果是只有一个登录的系统可以直接修改api.js 和 store的 user.js来记录用户信息
//去掉这部分即可使用mock的admin admin 登录（login的解析XML也需要修改）
api.gwssi.user.login.url = "https://portal.isearch.link/txn999999.ajax";
api.gwssi.user.info.url = "https://portal.isearch.link/txn666666.ajax";
api.gwssi.user.logout.url = "https://portal.isearch.link/freeze.main?txn-code=logout";

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)
Vue.use(GwTheme);

//Vue中的全局变量通过Vue.prototype实现
Vue.prototype.$Config = Config
Vue.prototype.$Func = Fun

// 注册全局对象
window.isearchRouter = router;

new Vue({
  i18n,
  store,
  router,
  el: '#app',
  render: h => h(app)
})