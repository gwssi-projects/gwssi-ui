import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../../common/store'
import { ElAlert } from 'element-ui'

//路由对应的页面
import login from '../page/login'
//登陆后页面
import logged from '../page/logged'

Vue.use(VueRouter);

const register = { template: '<div>register</div>' }
const portal = { template: '<div>portal</div>' }
const form = { template: '<div>form</div>' }
const button = { template: '<div>button</div>' }
const grid = { template: '<div>grid</div>' }
const router2 = { template: '<div>router2</div>' }
const page404 = { template: '<div>404</div>' }
const page500 = { template: '<div>page500</div>' }

const routes = [
  //login不需要权限验证
  { path: '/', name: "index", component: login },
  { path: '/login', name: "login", component: login },
  {
    path: '/logged',
    name: "logged",
    component: logged,
    // meta 字段就是路由元信息字段，这里可以配置自定义字段
    meta: {
      title: '登陆后页面',
      permisson: ['admin1', 'user1'],
      requireAuth: true
    }
    // 模块使用异步加载
    // component: (resolve) => require(['../components/login/login.vue'], resolve)
  },
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

// //用于判断权限

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
//你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

router.beforeEach((to, from, next) => {

  //判断权限
  if (to.matched.some(record => record.meta.requireAuth)) {

    console.log("record.meta.permisson：" + to.meta.permisson);
    var role = store.dispatch("checkRoles", to.meta.permisson);

    console.log("role = " + role);

    if (!role) {

      ElAlert("当前用户未登录或无权限访问此页面。", "提示", {
        confirmButtonText: "确定",
        //箭头函数可以使用this
        callback: action => {
          //跳转登录后页面
          next('/login')
        }
      });

    } else {
      next()
    }
  } else {
    next()
  }

})


// router.beforeResolve((to, from, next) => {
//   /* must call `next` */
// })


// router.afterEach((to, from) => { })

// //错误处理
// router.onError(callback => {
//   // 2.4.0新增 并不常用，了解一下就可以了 
//   console.log(callback, 'callback');
// });

export default router;

