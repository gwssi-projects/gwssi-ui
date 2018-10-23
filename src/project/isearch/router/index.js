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

var domain = "https://portal.isearch.link/";
var uiDomain = "https://isearch.link/";

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

    children: [

      {
        path: '/',
        name: 'home',
        props: {
          url: uiDomain + "ui/home.html?clusterName=IPSearch&url=10.10.1.141:9500&url_http=10.10.1.141:8600"
        },
        meta: {
          title: '首页',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
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

      //权限管理
      {
        path: '/auth1',
        name: 'auth1',
        props: {
          url: domain + "txn99a90308.do?wmode=opaque"
        },
        meta: {
          title: '机构管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },


      {
        path: '/auth2',
        name: 'auth2',
        props: {
          url: domain + "commons/permission/orguser/query-xt_qxgl_yhxx.jsp?wmode=opaque"
        },
        meta: {
          title: '用户管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },

      {
        path: '/auth3',
        name: 'auth3',
        props: {
          url: domain + "commons/permission/priv/query-xt_qxgl_jsxx.jsp?wmode=opaque"
        },
        meta: {
          title: '角色管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },

      {
        path: '/auth4',
        name: 'auth4',
        props: {
          url: domain + "txn980301.do?wmode=opaque"
        },
        meta: {
          title: '功能维护',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },


      //配置管理
      {
        path: '/content1',
        name: 'content1',
        props: {
          url: domain + "txn06B02A.do?wmode=opaque"
        },
        meta: {
          title: '菜单管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },

      {
        path: '/content2',
        name: 'content2',
        props: {
          url: domain + "txn64B01.do?wmode=opaque"
        },
        meta: {
          title: '数据源管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },


      {
        path: '/content3',
        name: 'content3',
        props: {
          url: domain + "txn64B02.do?wmode=opaque"
        },
        meta: {
          title: '通用查询管理',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      },


      //通过参数绑定路由对象参数
      {
        path: '/elastic/:url',
        name: 'elastic-ui',
        meta: {
          title: '集群信息',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/isearch/page/iframe2" */ '../page/iframe/index2.vue')
      },


      //ES管理 
      //手动绑定props对象数据可以使用下属方法
      // {
      //   path: '/106-elastic1',
      //   name: '106-elastic1',
      //   props: {
      //     url: uiDomain + "ui/clusterm.html?url=es2-elasticsearch-master.isearch:9300&clusterName=elasticsearch&url_http=es2-elasticsearch-master.isearch:9200&wmode=opaque#/clusterInfo"
      //   },
      //   meta: {
      //     title: '集群信息',
      //     permisson: ['user'],
      //     requireAuth: true
      //   },
      //   component: () =>
      //     import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      // },

      // {
      //   path: '/106-elastic2',
      //   name: '106-elastic2',
      //   props: {
      //     url: uiDomain + "ui/node-monitor.html?url=es2-elasticsearch-master.isearch:9300&clusterName=elasticsearch&url_http=es2-elasticsearch-master.isearch:9200&wmode=opaque"
      //   },
      //   meta: {
      //     title: '节点监控',
      //     permisson: ['user'],
      //     requireAuth: true
      //   },
      //   component: () =>
      //     import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      // },

      // {
      //   path: '/106-elastic3',
      //   name: '106-elastic3',
      //   props: {
      //     url: uiDomain + "ui/db.html?url=es2-elasticsearch-master.isearch:9300&clusterName=elasticsearch&url_http=es2-elasticsearch-master.isearch:9200&wmode=opaque"
      //   },
      //   meta: {
      //     title: '数据库管理',
      //     permisson: ['user'],
      //     requireAuth: true
      //   },
      //   component: () =>
      //     import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      // },

      // {
      //   path: '/106-elastic4',
      //   name: '106-elastic4',
      //   props: {
      //     url: uiDomain + "ui/param-config.html?url=es2-elasticsearch-master.isearch:9300&clusterName=elasticsearch&url_http=es2-elasticsearch-master.isearch:9200&wmode=opaque"
      //   },
      //   meta: {
      //     title: '公共参数',
      //     permisson: ['user'],
      //     requireAuth: true
      //   },
      //   component: () =>
      //     import( /* webpackChunkName: "project/isearch/page/iframe" */ '../page/iframe/index.vue')
      // },

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