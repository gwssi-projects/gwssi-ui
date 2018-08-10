import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//国际化相关
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

import Main from './Main.vue'

Vue.use(VueI18n)

Vue.config.lang = 'zh-cn'
// Vue.locale('zh-cn', zhLocale)
// Vue.locale('en', enLocale)

Vue.use(ElementUI)



new Vue({
    el: '#main',
    //render 动态创建组件，而不用通过template模版创建。
    render: h => h(Main)
    // render: function (createElement) {
    //   return createElement(App);
    // }
  })
  
