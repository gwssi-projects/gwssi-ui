const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    }
  },
  getters : {
    //错误日志
    errorLogs: state => state.logs,
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  }
}

export default errorLog
