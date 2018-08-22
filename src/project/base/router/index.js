import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

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

const router = new VueRouter({
  routes
})

export default router;


// import AppView from '@/components/app-view'
// import Home from '@/pages/home'

// Vue.use(Router)

// const page = name => () => import('@/pages/' + name)

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '',
//       component: AppView,
//       children: [
//         { path: '/', name: 'home', component: Home },
//         { path: '/button', name: 'c-button', component: page('c-button') },
//         { path: '/switch', name: 'c-switch', component: page('c-switch') },
//         { path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox') },
//         { path: '/alert', name: 'c-alert', component: page('c-alert') },
//         { path: '/input', name: 'c-input', component: page('c-input') },
//         { path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard') },
//         { path: '/loading', name: 'c-loading', component: page('c-loading') },
//         { path: '/data-table', name: 'p-data-table', component: page('table') },
//         { path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown') },
//         { path: '/navbar', name: 'c-navbar', component: page('c-navbar') },
//         { path: '/container', name: 'c-container', component: page('c-container') },
//         { path: '/demo', name: 'demo', component: page('demo') },
//         { path: '/404', name: '404', component: page('404') },
//         { path: '/500', name: '500', component: page('500') }
//       ]
//     },
//     { path: '/login', name: 'login', component: page('login') },
//     { path: '/cnode', name: 'cnode', component: page('cnode') },
//     // pages
//     { path: '/home-login', name: 'p-login', component: page('home-login') },
//     { path: '/register', name: 'p-register', component: page('register') },
//     { path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard') },
//     { path: '*', redirect: { name: '404' } }
//   ]
// })
