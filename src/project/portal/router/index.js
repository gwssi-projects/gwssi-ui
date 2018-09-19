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


Vue.use(VueRouter);

var loginPage = '/login';

//异步加载的权限路由
const login = () =>
  import( /* webpackChunkName: "project/portal/page/login" */ '../page/login/login.vue')
const main = () =>
  import( /* webpackChunkName: "project/portal/page/main" */ '../page/main/main.vue')


const routes = [{
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
          import( /* webpackChunkName: "project/portal/page/home" */ '../page/home')
      },
      {
        path: '/font_awesome',
        name: 'FontAwesome',
        meta: {
          title: 'FontAwesome 图标',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/icon/FontAwesome" */ '../page/icon/FontAwesome.vue')
      },
      {
        path: '/element_icon',
        name: 'ElementIcon',
        meta: {
          title: 'Element 图标',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/icon/ElementIcon" */ '../page/icon/ElementIcon.vue')
      },
      //   {
      //     path: '/post_manage',
      //     name: 'PostManage',
      //     meta: {
      //       title: '文章管理',
      //       keepAlive: false
      //     },
      //     component: resolve => require(['~/views/ContentManage/Index.vue'], resolve),
      //   },
      //   {
      //     path: '/user_manage',
      //     name: 'UserManage',
      //     meta: {
      //       title: '用户列表',
      //       keepAlive: true
      //     },
      //     component: resolve => require(['~/views/UserManage/Index.vue'], resolve),
      //   },
      //   {
      //     path: '/category_manage',
      //     name: 'CategoryManage',
      //     meta: {
      //       title: '分类列表',
      //       keepAlive: true
      //     },
      //     component: resolve => require(['~/views/CategoryManage/Index.vue'], resolve),
      //   },
      //   {
      //     path: '/role_manage',
      //     name: 'RoleManage',
      //     meta: {
      //       title: '角色列表',
      //       keepAlive: true
      //     },
      //     component: resolve => require(['~/views/PermissionManage/Role/Role.vue'], resolve),
      //   },
      //   {
      //     path: '/permission_list',
      //     name: 'PermissionList',
      //     meta: {
      //       title: '权限列表',
      //       keepAlive: true
      //     },
      //     component: resolve => require(['~/views/PermissionManage/Permission/Index.vue'], resolve),
      //   },
      //   //个人中心，可能有修改密码，头像修改等路由
      //   Personal.index,
    ]


  },
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