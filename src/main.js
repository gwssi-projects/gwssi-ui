import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Css from './main.less';
import Main from './main.vue'
import SelectLang from './common/components/select-lang'

Vue.use(ElementUI)
Vue.use(SelectLang)

new Vue({
  el: '#main',
  //render 动态创建组件，而不用通过template模版创建。
  render: h => h(Main)
  // render: function (createElement) {
  //   return createElement(App);
  // }
})

