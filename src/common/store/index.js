import Vue from 'vue'
import Vuex from 'vuex'

//基础
// import user from './user'
import errorLog from './errorLog'
import app from './app'

Vue.use(Vuex)

//模块内部的数据：state是局部的  getter、mutation和action 是全局的
//①内部state，模块内部的state是局部的，也就是模块私有的，比如是car.js模块state中的list数据，
//我们要通过this.$store.state.car.list获取；
//②内部getter、mutation和action，仍然注册在全局命名空间内，这是为了多模块可以同时响应同一mutation；（所以多个store的话这些名称不能冲突？）
//this.$store.car.carGetter的结结果是undefined，而通过this.$store.carGetter则可以拿到(不再需要car的名称)。

//app使用getter的话不需要加app，如果获取state需要用this.$store.state.app，这里组件获取state一律使用getter

const store = new Vuex.Store({
  modules: {
    // user,
    errorLog: errorLog,
    app: app

  }
})

export default store
