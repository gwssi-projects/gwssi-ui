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

menu.elastic_icon = {
  name: '106-elastic',
  icon: 'fa fa-th',
  children: {}
};
let elastic = menu.elastic_icon.children;

elastic.menu1 = {
  name: '集群信息',
  path: '/106-elastic1',

};
elastic.menu2 = {
  name: '节点监控',
  path: '/106-elastic2',
};
elastic.menu3 = {
  name: '数据库管理',
  path: '/106-elastic3',
};
elastic.menu4 = {
  name: '公共参数',
  path: '/106-elastic4',
};

menu.auth_icon = {
  name: '权限管理',
  icon: 'fa fa-eercast',
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
  icon: 'fa fa-file-text-o',
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


export default menu;