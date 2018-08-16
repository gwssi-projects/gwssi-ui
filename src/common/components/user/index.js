import User from './user'

User.install = function (Vue) {
  Vue.component(User.name, User)
}

export default User
