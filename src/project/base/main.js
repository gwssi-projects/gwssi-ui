import Vue from 'vue'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import Css from './main.less';
import Lang from '../../common/components/select-lang'

import router from './router/index'
import app from './main.vue'

Vue.use(ElementUI)
Vue.use(Lang)
Vue.use(VueMeta)

new Vue({
  i18n,
  router,
  created() {
    //删除loading层
    try { document.body.removeChild(document.getElementById('appLoading')); } catch (e) { }
  },
  metaInfo: {
    //标题国际化
    //meatInfo 为vuemeta标签返回对象，无法使用this.$t("gwssi.title.gwssi")？只能使用全局注册的 i18n
    title: i18n.t("gwssi.title.gwssi")
  },
  el: '#app',
  render: h => h(app)
})