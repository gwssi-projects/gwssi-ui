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


/**
 * 字体图标
 * @type {{name: string, icon: string, children: {}}}
 */
menu.font_icon = {
  name: '字体图标',
  icon: 'fa fa-th',
  children: {}
};
let icon = menu.font_icon.children;

icon.font_awesome = {
  name: 'FontAwesome图标库',
  path: '/font_awesome',

};
icon.element_icon = {
  name: 'ElementUI图标',
  path: '/element_icon',
};
icon.custom_icon = {
  name: '自定义字体图标',
  path: '/custom_icon',
};


/**
 * 图表
 * @type {{name: string, icon: string, children: {}}}
 */
menu.charts_icon = {
  name: '图表',
  icon: 'fa fa-eercast',
  children: {}
};
let charts = menu.charts_icon.children;

charts.charDashboard = {
  name: '仪表盘 ',
  path: '/charDashboard'
};

/**
 * 内容管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.content_manage = {
  name: '内容管理',
  icon: 'fa fa-file-text-o',
  children: {}
};

let ContentManage = menu.content_manage.children;

ContentManage.grid = {
  name: 'Grid样例',
  path: '/grid_demo',
};

ContentManage.steps = {
  name: '步骤条',
  path: '/steps_demo',
};

/** 
ContentManage.tinymce = {
  name: '文本编辑器',
  path: '/tinymce',
};
*/

ContentManage.inlineEditTable = {
  name: 'table内编辑',
  path: '/inlineEditTable',
};

ContentManage.guide = {
  name: '引导页面',
  path: '/guide',
};

ContentManage.mixin = {
  name: '返回顶部',
  path: '/backToTop',
};

ContentManage.p404 = {
  name: '404',
  path: '/p404',
};



/**
 * 嵌入IFRAME 
 * @type {{name: string, icon: string, children: {}}}
 */
menu.iframe_icon = {
  name: 'IFrame解决方案',
  icon: 'fa fa-window-maximize',
  children: {}
};
let iframe = menu.iframe_icon.children;

iframe.iframe1 = {
  name: '直接嵌入',
  path: '/iframe1',

};
iframe.iframe2 = {
  name: 'url传参及改变标题',
  path: '/iframe2/http%3a%2F%2Fisearch.link%2Fui%2Fclusterm.html%3Furl%3Des2-elasticsearch-master.isearch%3A9300%26clusterName%3Delasticsearch%26url_http%3Des2-elasticsearch-master.isearch%3A9200/elasticsearch 集群信息',
};


/**
 * 分类管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.category_manage = {
  name: '菜单管理',
  icon: 'fa fa-sitemap',
  children: {}
};
let CategoryManage = menu.category_manage.children;

CategoryManage.category = {
  name: '菜单列表',
  path: '/menu_list',
};


export default menu;