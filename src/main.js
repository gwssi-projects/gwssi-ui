import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Css from './main.less';
import Main from './main.vue'
import Lang from './common/components/select-lang'

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

//跳转首页
if (process.env.INDEX == null || process.env.INDEX == "" || process.env.INDEX == "base") {
  window.location.href = "./project/base/";
} else if (process.env.INDEX == "portal") {
  window.location.href = "./project/portal/";
}