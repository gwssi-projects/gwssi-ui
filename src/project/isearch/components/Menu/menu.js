import request from '@components/request'
import store from "@store/index";

let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer',
};


//异步获取数据
//需要增加token
var service = request.get("https://portal.isearch.link/txn0302.do", null);
service.then(
  json => {
    // console.log("加载菜单" + json.data);
    //只获取集群节点的菜单
    var portalMenu = json.data.context.menu;

    console.log("menu length" + portalMenu.length);

    for (var i = 0; i < portalMenu.length; i++) {
      //"menuId": "d2983f8fc0a802602d551db5a807ba38",
      if (portalMenu[i].menuId == "d2983f8fc0a802602d551db5a807ba38") {


        var esMenu = portalMenu[i].subMenus;

        for (var j = 0; j < esMenu.length; j++) {


          var menuName = esMenu[j].menuName;
          var elastic_icon = "elastic_icon" + j;

          menu[elastic_icon] = {
            name: menuName,
            icon: 'iconfont icon-shebeiguanli',
            children: {}
          };

          let elastic = menu[elastic_icon].children;

          var subMenus = esMenu[j].subMenus;


          //  elastic.menu1 = {
          //   name: '集群信息',
          //   path: '/106-elastic1',

          // };
          // elastic.menu2 = {
          //   name: '节点监控',
          //   path: '/106-elastic2',
          // };
          // elastic.menu3 = {
          //   name: '数据库管理',
          //   path: '/106-elastic3',
          // };
          // elastic.menu4 = {
          //   name: '公共参数',
          //   path: '/106-elastic4',
          // };


          for (var n = 0; n < subMenus.length; n++) {

            var m = subMenus[n];

            elastic["menu" + n] = {
              name: m.menuName,
              path: '/elastic/' + encodeURIComponent(m.url) + "/" + encodeURIComponent(m.menuName),
              url: m.url

            }

          }

        }


      }
    }



    menu.auth_icon = {
      name: '权限管理',
      icon: 'iconfont icon-daibanshixiang',
      children: {}
    };
    let auth = menu.auth_icon.children;

    auth.menu1 = {
      name: '机构管理 ',
      path: '/auth1'
    };
    auth.menu2 = {
      name: '用户管理 ',
      path: '/auth2'
    };
    auth.menu3 = {
      name: '角色管理 ',
      path: '/auth3'
    };
    auth.menu4 = {
      name: '功能维护 ',
      path: '/auth4'
    };


    menu.content_manage = {
      name: '配置管理',
      icon: 'iconfont icon-yingyongguanli',
      children: {}
    };

    let contentManage = menu.content_manage.children;

    contentManage.menu1 = {
      name: '菜单管理',
      path: '/content1',
    };

    contentManage.menu2 = {
      name: '数据源管理',
      path: '/content2',
    };

    contentManage.menu3 = {
      name: '通用查询管理',
      path: '/content3',
    };

    store.dispatch("setMenuState", store.getters.menuState + 1);

  },
  error => {
    console.log("加载菜单错误" + error);
  }
);

// //试一下原生的
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://portal.isearch.link/txn0302.do');
// xhr.withCredentials = true;
// //如果使用了 mock 测试环境中拦截的url为跨域的url会重新创建一个xhr提交请求，这时候设置withCredentials就失效了 需要重新设置
// xhr.custom.xhr.withCredentials = true;
// xhr.send();
// console.log('xhr.send()');

export default menu;