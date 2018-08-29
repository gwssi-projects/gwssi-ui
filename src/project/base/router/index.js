import Vue from 'vue'
import VueRouter from 'vue-router'

//路由对应的页面
import login from '../page/login'


Vue.use(VueRouter);


// constantRouterMap： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
// asyncRouterMap： 代表那些需求动态判断权限并通过 addRouters 动态添加的页面。


// constantRouterMap 和 asyncRouterMap。






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

const router = new VueRouter({
  routes
})

export default router;

