import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//基础
import user from './user'
import errorLog from './errorLog'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    errorLog
  },
  //只能通过get获取store的数据，类似java pojo，属性定义后要设置get 和 set，这里对应getters和mutations
  getters
})

export default store
