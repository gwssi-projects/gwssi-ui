import request from '@components/request'
import store from "../../store";

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

// 1、集群管理
//        1、专利库
//                1、集群信息
//                 2、数据库管理
//                 3、节点管理
//                 4、接入管理
//                 5、参数管理
//            2、商标库
//                  1、集群信息
//                 2、数据库管理
//                 3、节点管理
//                 4、接入管理
//                  5、参数管理


menu.colony = {
  name: '集群管理',
  icon: 'iconfont icon-daibanshixiang',
  path: '',
  children: {}
}

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

          menu.colony.children[elastic_icon] = {
            name: menuName,
            icon: 'iconfont icon-shebeiguanli',
            path: '',
            children: {}
          };

          let elastic = menu.colony.children[elastic_icon].children;

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

    // 2、系统管理
    //    1、权限管理
    //             1、机构管理
    //              2、用户管理
    //              3、角色管理
    //              4、功能管理
    //      2、菜单管理
    //      3、数据源
    //      4、通用查询


    //系统管理
    menu.system = {
      name: '系统管理',
      icon: 'iconfont icon-daibanshixiang',
      path: '',
      children: {}
    }

    let system = menu.system.children;


    system.auth_icon = {
      name: '权限管理',
      icon: 'iconfont icon-yingyongguanli',
      path: '',
      children: {}
    };
    let auth = system.auth_icon.children;

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


    system.menu1 = {
      name: '菜单管理',
      path: '/content1',
    };

    system.menu2 = {
      name: '数据源管理',
      path: '/content2',
    };

    system.menu3 = {
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

export const sidebarMenu = [

  {
    name: '机构管理',
    icon: 'fa fa-eercast',
    path: '/auth1',
  },

  {
    name: '用户管理',
    icon: 'fa fa-circle',
    path: '/auth2',
  },

  {
    name: '角色管理',
    icon: 'fa fa-address-book',
    path: '/auth3',
  },

  {
    name: '功能维护',
    icon: 'fa fa-telegram',
    path: '/auth4',
  },

  {
    name: '菜单管理',
    icon: 'fa fa-thermometer-full',
    path: '/content1',
  },

  {
    name: '数据源管理',
    icon: 'fa fa-shower',
    path: '/content2',
  },

  {
    name: '通用查询管理',
    icon: 'fa fa-etsy',
    path: '/content3',
  }

]