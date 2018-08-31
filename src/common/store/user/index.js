import api from '../../api'
import tools from "../../components/tools";

//Token-d77b15d5-fae3-4f91-95ec-6ba79d246972
export const TokenKey = 'user-token'

const user = {
  // 类似组件中的data
  state: {
    //用户名 比如admin/user
    user: '',
    //用户状态 正常停用之类，这里0表示正常，1停用
    status: '',
    //用户的序列id
    id: '',
    //当前对应的token
    token: tools.cookies.get(TokenKey),
    //用户名称
    name: '',
    //权限
    roles: [],
    //扩展信息
    info: {
    }
  },

  getters : {
    // userTokenKey: state => state.user.userTokenKey,
    // token: state => {
    //     return state.user.state == 1 return "激活"

    // },
    // avatar: state => state.user.avatar,
    // name: state => state.user.name,
    // introduction: state => state.user.introduction,
    // status: state => state.user.status,
    // roles: state => state.user.roles,
    // setting: state => state.user.setting,
    // addRouters: state => state.permission.addRouters,



  },

  //必须通过这一步来修改数据
  //不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化。
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  // 用户派发的行为，类似methods
  actions: {
    // 用户名登录（需要同步进行）
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          //设置cookies的操作由服务器完成
          // tools.cookies.set(TokenKey, response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息（需要同步进行）
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
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
    CheckRoles({ commit }, role) {
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
