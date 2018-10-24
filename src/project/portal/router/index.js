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
  import( /* webpackChunkName: "project/portal/page/login" */ '../page/login/login.vue')
const main = () =>
  import( /* webpackChunkName: "project/portal/page/main" */ '../page/main/main.vue')

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
          import( /* webpackChunkName: "project/portal/page/home" */ '../page/home/Index.vue')
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
      {
        path: '/custom_icon',
        name: 'CustomIcon',
        meta: {
          title: '自定义图标',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/icon/CustomIcon" */ '../page/icon/CustomIcon.vue')
      },
      //这两个页面直接使用base的页面
      {
        path: '/grid_demo',
        name: 'Grid_demo',
        meta: {
          title: 'Grid样例',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/post/grid" */ '../page/post/grid.vue')
      },

      //文本编辑器
      {
        path: '/tinymce',
        name: 'Tinymce',
        meta: {
          title: '文本编辑器',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/example" */ '../page/example/create.vue')
      },


      //table内编辑
      {
        path: '/inlineEditTable',
        name: 'InlineEditTable',
        meta: {
          title: 'table内编辑',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/table/inlineEditTable" */ '../page/table/inlineEditTable.vue')
      },


      //综合table
      {
        path: '/guide',
        name: 'Guide',
        meta: {
          title: '引导页',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/guide" */ '../page/guide/index.vue')
      },


      //小组件
      {
        path: '/backToTop',
        name: 'BackToTop',
        meta: {
          title: '返回顶部',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/components-demo/backToTop" */ '../page/components-demo/backToTop.vue')
      },

      {
        path: '/steps_demo',
        name: 'Steps_demo',
        meta: {
          title: '步骤条',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/post/steps" */ '../page/post/steps.vue'),

        children: [{
            path: '',
            name: 'step1',
            meta: {
              title: '步骤1',
              permisson: ['user'],
              requireAuth: true
            },
            component: () =>
              import( /* webpackChunkName: "project/portal/page/post/steps/step1" */ '../page/post/steps/step1.vue'),
          },
          {
            path: 'step1',
            name: 'step1',
            meta: {
              title: '步骤1',
              permisson: ['user'],
              requireAuth: true
            },
            component: () =>
              import( /* webpackChunkName: "project/portal/page/post/steps/step1" */ '../page/post/steps/step1.vue'),
          },
          {
            path: 'step2',
            name: 'step2',
            meta: {
              title: '步骤2',
              permisson: ['user'],
              requireAuth: true
            },
            component: () =>
              import( /* webpackChunkName: "project/portal/page/post/steps/step2" */ '../page/post/steps/step2.vue'),
          },
          {
            path: 'step3',
            name: 'step3',
            meta: {
              title: '步骤3',
              permisson: ['user'],
              requireAuth: true
            },
            component: () =>
              import( /* webpackChunkName: "project/portal/page/post/steps/step3" */ '../page/post/steps/step3.vue'),
          },
          {
            path: 'step4',
            name: 'step4',
            meta: {
              title: '步骤4',
              permisson: ['user'],
              requireAuth: true
            },
            component: () =>
              import( /* webpackChunkName: "project/portal/page/post/steps/step4" */ '../page/post/steps/step4.vue'),
          }
        ]
      },

      {
        path: '/menu_list',
        name: 'Menu_list',
        meta: {
          title: '菜单列表',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/menu/list" */ '../page/menu/list.vue')
      },


      //char
      {
        path: '/charDashboard',
        name: 'CharDashboard',
        meta: {
          title: '图表仪表盘',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/char/index" */ '../page/char/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/personal" */ '../page/personal/Index.vue')
      },

      //iframe
      {
        path: '/iframe1',
        name: 'iframe1',
        props: {
          url: "https://www.baidu.com"
        },
        meta: {
          title: '直接嵌入',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
      },

      //通过参数绑定路由对象参数
      {
        path: '/iframe2/:url/:routerTitle',
        name: 'iframe2',
        meta: {
          //使用beforeEach事件来更改title的值
          title: ':routerTitle',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/iframe2" */ '@appPortal/page/iframe/index2.vue')
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

  //更新一下模拟登录的token 防止被登出
  //判读是否是生产环境 
  if (process.env.NODE_ENV === 'development') {
    var token = tools.cookies.get(TokenKey);

    if (token != null && token != "") {
      tools.setCookie(TokenKey, token, 1 / 48, "/");
    }
  }

  //通过url参数来更改路由标签页的标题
  var routerTitle = to.params.routerTitle;
  if (routerTitle != null && routerTitle != "") {
    to.meta.title = routerTitle;
  }

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