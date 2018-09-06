import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  Notification
} from 'element-ui'
import {
  Loading
} from 'element-ui'

import store from '@store/index'
import tools from "@components/tools";
import {
  TokenKey
} from '@store/user'

//路由对应的页面
import login from '@appBase/page/login'
import p404 from '@appBase/page/404'
import p500 from '@appBase/page/500'

Vue.use(VueRouter);

//无权限跳转地址
const indexPage = '/login';

const UserID = {
  template: '<p style=" text-align: center; ">这是一个页面组件，UserName = {{ $store.state.user.name }} , UserID = {{ $route.params.id }} 。</p>'
}

const UserProfile = {
  template: '<p style=" text-align: center; ">这是一个页面组件，UserProfile 。</p>'
}


const portal = {
  template: '<div>portal</div>'
}
const form = {
  template: '<div>form</div>'
}
const grid = {
  template: '<div>grid</div>'
}


const routes = [
  //login不需要权限验证
  {
    path: '/',
    component: login
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/logged',
    // component: logged,
    // 权限模块需要使用异步加载 否则beforeEach只执行一次？
    component: (resolve) => require(['../page/logged'], resolve),
    // meta 字段就是路由元信息字段，这里可以配置自定义字段
    meta: {
      title: '登陆后页面',
      permisson: ['admin', 'user'],
      requireAuth: true
    }

  },
  {
    path: '/adminLogged',
    component: (resolve) => require(['../page/adminLogged'], resolve),
    meta: {
      title: 'admin登陆后页面',
      permisson: ['admin'],
      requireAuth: true
    }
  },
  {
    path: '/router2',
    component: (resolve) => require(['../page/subRouter'], resolve),
    meta: {
      title: '嵌套路由',
      permisson: ['admin', 'user'],
      requireAuth: true
    },
    children: [{
        // 当 /router2/:id 匹配成功渲染
        path: ':id',
        component: UserID
      },
      {
        // 当 /router2/:id/profile 匹配成功，
        path: ':id/profile',
        component: UserProfile
      }
    ]
  },
  {
    path: '/button',
    component: (resolve) => require(['../page/comAuth'], resolve),
    meta: {
      title: '组件权限',
      permisson: ['admin', 'user'],
      requireAuth: true
    }
  },
  {
    path: '/page404',
    component: p404
  },
  {
    path: '/page500',
    component: p500
  },
  //这样就配置了其它页面都是404了
  {
    path: '*',
    component: p404
  },

  {
    path: '/portal',
    component: portal
  },
  {
    path: '/form',
    component: form
  },
  {
    path: '/grid',
    component: grid
  }
]

const router = new VueRouter({
  routes
})

function hasPermission(roles, permissionRoles) {

  //没有设置路由权限
  if (permissionRoles == null) {
    return true
  }

  if (roles.length == 0) {
    return false;
  }

  //判断权限
  var auth = false;
  for (var i = 0; i < permissionRoles.length; i++) {
    var r = (permissionRoles[i]);

    for (var n = 0; n < roles.length; n++) {
      var r2 = (roles[n]);
      if (r == r2) {
        auth = true;
      }
    }

  }

  return auth;

}

function noAuth(logStr, titleStr, messageStr) {

  console.log(logStr);

  Notification({
    title: titleStr,
    type: 'error',
    message: messageStr
  });

}


// //用于判断权限

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
//你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。


router.beforeEach((to, from, next) => {

  //需要判断权限
  if (to.matched.some(record => record.meta.requireAuth)) {

    //先判断是否有token
    if (tools.cookies.get(TokenKey) == null || tools.cookies.get(TokenKey) == '') {
      noAuth("未登录用户", "无权限", '当前用户未登录。');
      next(indexPage)
      return
    }

    if (to.meta.permisson == null) {
      next()
      return
    }

    // 初步判断当前用户是否已拉取完user_info信息
    if (store.state.user.roles.length === 0) {

      console.log("路由获取用户信息");

      let loadingInstance = Loading.service({
        target: "main#app-main",
        body: false,
        background: "#ffffff",
        text: '正在加载页面',
        lock: false
      });

      store.dispatch("getUserInfoPromise", null)
        .then(function (json) {

          loadingInstance.close();

          if (json.data.content != null) {
            store.dispatch("updateUserInfo", json.data.content);
          }

          if (hasPermission(store.state.user.roles, to.meta.permisson)) {
            next()
          } else {
            noAuth('当前用户权限无法访问此页面。', "权限不足", '当前用户权限无法访问此页面。');
            next(indexPage)
            return
          }

        }, function (error) {

          loadingInstance.close();

          noAuth('获取用户信息错误：' + error, "无权限", '获取用户信息错误。');
          next(indexPage)
          return
        });

    } else {

      console.log("已经加载用户信息");

      if (hasPermission(store.state.user.roles, to.meta.permisson)) {
        next()
      } else {
        noAuth('当前用户权限无法访问此页面。', "权限不足", '当前用户权限无法访问此页面。');
        next(indexPage)
        return
      }

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