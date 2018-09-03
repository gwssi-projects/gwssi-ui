import api from '../../api'
import tools from "../../components/tools";
import request from '../../components/request'

//Token-d77b15d5-fae3-4f91-95ec-6ba79d246972
export const TokenKey = 'token'

const user = {
  // 类似组件中的data
  state: {
    //用户ID 比如admin/user
    user: 'none',
    //用户状态 正常停用之类，这里0表示正常，1停用
    status: '0',
    //用户的序列id 1，2，3
    id: '-1',
    //用户名称 管理员/普通用户
    name: '访客',
    //权限
    roles: [],
    //扩展信息
    info: {
    }
  },

  getters: {
    token: state => {
      var token = tools.cookies.get(TokenKey);
      return token
    },

    status: state => {
      if (state.status == '0') {
        return "正常"
      }

      if (state.status == '1') {
        return "停用"
      }
    }
  },

  //必须通过这一步来修改数据
  mutations: {

    UPDATE_USEROBJ: (state, userObj) => {

      state.user = userObj.user
      state.status = userObj.status
      state.id = userObj.id
      state.name = userObj.name
      state.roles = userObj.roles
      state.info = userObj.info

    },

    SET_USER: (state, user) => {
      state.user = user
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }

  },

  // 用户派发的行为，类似methods
  actions: {

    //更新用户信息
    updateUserInfo({ commit }, userInfo) {
      commit('UPDATE_USEROBJ', userInfo)
    },

    // 用户名登录
    login({ commit }, userInfo) {
      //这里应该return 因为可能有后续操作 比如激活按钮等等
      return request.get(api.gwssi.user.login.url, userInfo);
    },

    // 获取用户信息（从服务器获取用户信息）
    getUserInfo({ commit, state }) {

      request.get(api.gwssi.user.info.url, null).then(function (json) {
        console.log("获取用户信息");

        if (json.data != null) {
          commit('UPDATE_USEROBJ', json.data)
        }

      }, function (error) {
        console.error('获取用户信息错误：', error);
      });

    },

    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          tools.cookies.remove(TokenKey)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 验证权限
    checkRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
