import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import Css from './main.less';
import Lang from '../../common/components/select-lang'

import Header from './page/header'

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)
Vue.use(Router)


//路由规则单独一个文件设置 路由的404和500配置 嵌套路由

const login = { template: '<div>login</div>' }
const logged = { template: '<div>logged</div>' }
const register = { template: '<div>register</div>' }
const portal = { template: '<div>portal</div>' }
const form = { template: '<div>form</div>' }
const button = { template: '<div>button</div>' }
const grid = { template: '<div>grid</div>' }
const router2 = { template: '<div>router2</div>' }
const page404 = { template: '<div>404</div>' }
const page500 = { template: '<div>page500</div>' }

const routes = [
  { path: '/', name: "index", component: login },
  { path: '/login', name: "login", component: login },
  { path: '/logged', name: "logged", component: logged },
  { path: '/register', name: "register", component: register },
  { path: '/portal', name: "portal", component: portal },
  { path: '/form', name: "form", component: form },
  { path: '/button', name: "button", component: button },
  { path: '/grid', name: "grid", component: grid },
  { path: '/router2', name: "router2", component: router2 },
  { path: '/page404', name: "page404", component: page404 },
  { path: '/page500', name: "page500", component: page500 }
]

const router = new Router({
  routes
})

// header
new Vue({
  i18n,
  router,
  created() {
    //删除loading层
    try { document.body.removeChild(document.getElementById('appLoading')); } catch (e) { }
  },
  el: '#header',
  render: h => h(Header)

})

//main
new Vue({
  router
}).$mount('#main')