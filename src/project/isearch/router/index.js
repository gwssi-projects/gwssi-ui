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


import p404 from '@appPortal/page/common/404'


Vue.use(VueRouter);

var loginPage = '/login';

//异步加载的权限路由
const login = () =>
  import( /* webpackChunkName: "project/isearch/page/login" */ '../page/login/login.vue')
const main = () =>
  import( /* webpackChunkName: "project/isearch/page/main" */ '../page/main/main.vue')

const routes = [

  //login不需要权限验证
  {
    path: '/login',
    meta: {
      title: '后台登录',
      keepAlive: false
    },
    components: {
      blank: login,
    }
  },

  {
    path: '/',
    component: main,
    meta: {
      title: 'portal主界面',
      permisson: ['user'],
      requireAuth: true
    },

    children: [{
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/home" */ '../page/home/Index.vue')
      },

      //个人中心
      {
        path: '/personal',
        name: 'Personal',
        meta: {
          title: '个人中心',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/personal" */ '../page/personal/Index.vue')
      },

      //这样就配置了其它页面都是404了
      {
        path: '/*',
        name: 'p404',
        meta: {
          title: '当前页面不存在',
          permisson: ['user'],
          requireAuth: true
        },
        component: p404
      }
    ]
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



router.beforeEach((to, from, next) => {

  //需要判断权限
  if (to.matched.some(record => record.meta.requireAuth)) {

    //先判断是否有token
    if (tools.cookies.get(TokenKey) == null || tools.cookies.get(TokenKey) == '') {
      noAuth("未登录用户", "无权限", '当前用户未登录。');
      next(loginPage)
      return
    }

    if (to.meta.permisson == null) {
      next()
      return
    }

    // 初步判断当前用户是否已拉取完user_info信息
    if (store.state.user.roles.length === 0) {

      console.log("路由获取用户信息");

      // let loadingInstance = Loading.service({
      //   target: "#app-main",
      //   body: false,
      //   //background: "#ffffff",
      //   text: '正在加载页面',
      //   lock: false
      // });

      store.dispatch("getUserInfoPromise", null)
        .then(function (json) {

          // loadingInstance.close();

          if (json.data.content != null) {
            store.dispatch("updateUserInfo", json.data.content);
          }

          if (hasPermission(store.state.user.roles, to.meta.permisson)) {
            next()
          } else {
            noAuth('当前用户权限无法访问此页面。', "权限不足", '当前用户权限无法访问此页面。');
            next(loginPage)
            return
          }

        }, function (error) {

          // loadingInstance.close();

          noAuth('获取用户信息错误：' + error, "无权限", '获取用户信息错误。');
          next(loginPage)
          return
        });

    } else {

      console.log("已经加载用户信息");

      if (hasPermission(store.state.user.roles, to.meta.permisson)) {
        next()
      } else {
        noAuth('当前用户权限无法访问此页面。', "权限不足", '当前用户权限无法访问此页面。');
        next(loginPage)
        return
      }

    }

  } else {
    next()
  }

})



export default router;