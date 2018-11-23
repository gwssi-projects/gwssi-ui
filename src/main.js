import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Css from './main.less';
import Main from './main.vue'
import Lang from './common/components/select-lang'
import '../static/font_810232/iconfont.css'
import '../static/font_810232/iconfont.js'


Vue.use(ElementUI)
//Vue.js 的插件应当有一个公开方法 install, Vue.use会执行对应的install方法。
Vue.use(Lang)
Vue.use(VueMeta)

new Vue({
  i18n,
  el: '#main',
  //render 动态创建组件，而不用通过template模版创建。
  render: h => h(Main)
  // render: function (createElement) {
  //   return createElement(App);
  // }
})


console.log("当前模式：" + process.env.NODE_ENV);
console.log("当前domain：" + process.env.DOMAIN);
console.log("当前path：" + process.env.REQUEST_PATH);
console.log("当前首页：" + process.env.GW_INDEX);

//跳转首页 配置话就遍历需要加上双引号 比如 "base"
if (process.env.GW_INDEX == "base") {
  window.location.href = "./project/base/";
} else if (process.env.GW_INDEX == "portal") {
  window.location.href = "./project/portal/";
} else if (process.env.GW_INDEX == "isearch" && document.domain == "isearch.link") {
  //window.location.href = "./project/isearch/";
  window.location.href = "https://isearch.link/ui/isearch.html";
}