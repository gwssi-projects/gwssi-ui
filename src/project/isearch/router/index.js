import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  Notification
} from 'element-ui'

import {
  Message
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
var parseString = require("xml2js").parseString;


Vue.use(VueRouter);

var loginPage = '/login';

//异步加载的权限路由
const login = () =>
  import( /* webpackChunkName: "project/isearch/page/login" */ '../page/login/login.vue')
const main = () =>
  import( /* webpackChunkName: "project/isearch/page/main" */ '../page/main/main.vue')

//用于测试
const demo1 = r => require.ensure([], () => r(require('../page/personal/Index.vue')), 'page/demo1')


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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
          import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
      },


      //通过参数绑定路由对象参数
      {
        path: '/elastic/:url/:menuTitle',
        name: 'elastic-ui',
        meta: {
          //使用beforeEach事件来更改title的值
          title: ':menuTitle',
          permisson: ['user'],
          requireAuth: true
        },
        component: () =>
          import( /* webpackChunkName: "project/portal/page/iframe2" */ '@appPortal/page/iframe/index2.vue')
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
      //     import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
      //     import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
      //     import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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
      //     import( /* webpackChunkName: "project/portal/page/iframe" */ '@appPortal/page/iframe/index.vue')
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

  // Notification({
  //   title: titleStr,
  //   type: 'error',
  //   message: messageStr
  // });

  Message({
    type: 'error',
    message: messageStr
  });

}

function setUserStore() {


}

router.beforeEach((to, from, next) => {

  //更新一下模拟登录的token
  //判读是否是生产环境 
  //这两部分应该合并
  if (process.env.NODE_ENV === 'development') {
    var token = tools.cookies.get(TokenKey);

    if (token != null && token != "") {
      tools.setCookie(TokenKey, token, 1 / 48, "/");
    }

    //访问一下烽火台的获取用户页面 保持会话
    //并且如果获取不到用户 则设置store为空
    store.dispatch("getUserInfoPromise", null).then(function (xml) {


      var json;

      parseString(xml.data, function (err, result) {
        json = result;
      });

      var errNO = json.context["error-code"];
      var errDesc = json.context["error-desc"];
      var user = json.context.user;

      //错误
      if (errNO != "000000" || user.operName == null || user.operName == "") {

        user.user = "";
        user.status = "0";
        user.id = "0";
        user.name = "";
        user.roles = [];
        user.info = {};

        store.dispatch("updateUserInfo", user);

      }


    });


  }

  //更改菜单名称
  var menuTitle = to.params.menuTitle;
  if (menuTitle != null && menuTitle != "") {
    to.meta.title = menuTitle;
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
        .then(function (xml) {

          var json;

          parseString(xml.data, function (err, result) {
            console.log(JSON.stringify(result));
            json = result;
          });

          var errNO = json.context["error-code"];
          var errDesc = json.context["error-desc"];

          //其它错误
          if (errNO != "000000") {
            noAuth('当前用户权限无法访问此页面。', "权限不足", '获取用户发生错误。' + errDesc);
            next(loginPage)
            return;
          }

          //更新用户对象
          var user = json.context.user;
          user.user = user.operName;
          user.status = "0";
          //没有ID？
          user.id = "0";
          user.name = user.fullName;
          user.roles = ["user", "admin"];
          user.info = {};

          if (user.user == null || user.user == "") {
            noAuth('当前用户权限无法访问此页面。', "权限不足", '用户未登录。');
            next(loginPage)
            return;
          }

          store.dispatch("updateUserInfo", user);

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