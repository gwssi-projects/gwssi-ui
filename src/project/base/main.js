import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import Css from './main.less';
import Lang from '../../common/components/select-lang'
//字体图标 http://www.iconfont.cn/
import '../../../static/font_810232/iconfont.css'

import router from './router/index'
import app from './main.vue'

import '../../common/mock'

import store from "../../common/store"

// import { Loading } from "element-ui";

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)

//elementUI的loading
//构建组件
// let loadingInstance = Loading.service({
//   body: true,
//   background: "#ffffff",
//   text: i18n.t("gwssi.tips.build"),
//   lock: true
// });

new Vue({
  i18n,
  router,
  store,
  beforeCreate() {

  },
  created() {
    //删除loading层，此时加载完毕所有JS
    try { document.body.removeChild(document.getElementById('appLoading')); } catch (e) { console.error(e); }

    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      // loadingInstance.close();
    });
  },
  mounted() {
    //loadingInstance.close();
  },
  metaInfo: {
    //标题国际化
    //meatInfo 为vuemeta标签返回对象，无法使用this.$t("gwssi.title.gwssi")？只能使用全局注册的 i18n
    title: i18n.t("gwssi.title.gwssi")
  },
  el: '#app',
  render: h => h(app)
})