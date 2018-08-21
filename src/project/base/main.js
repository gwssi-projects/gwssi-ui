import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import Css from './main.less';
import Main from './main.vue'
import Lang from '../../common/components/select-lang'

Vue.use(ElementUI)
//Vue.js 的插件应当有一个公开方法 install, Vue.use会执行对应的install方法。
Vue.use(Lang)
Vue.use(VueMeta)
Vue.use(Router)

//白名单,不需要权限判断
// var whiteList = ['demo', 'login', 'register']




// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const login = { template: '<div>login</div>' }
const demo = { template: '<div>demo</div>' }
const register = { template: '<div>register</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/login', component: login },
  { path: '/demo', component: demo },
  { path: '/register', component: register }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router,
  created() {
    //删除loading层
    try { document.body.removeChild(document.getElementById('appLoading')); } catch (e) { }
  }
}).$mount('#main')

// 现在，应用已经启动了！






// new Vue({
//   i18n,
//   el: '#main',
//   //render 动态创建组件，而不用通过template模版创建。
//   render: h => h(Main)
//   // render: function (createElement) {
//   //   return createElement(App);
//   // }
// })

