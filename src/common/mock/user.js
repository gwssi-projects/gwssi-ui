
import tools from "../components/tools";
import { TokenKey } from '../../common/store/user'

const admin_token = 'admin_token'
const user_token = 'user_token'

const admin_pw = 'admin'
const user_pw = 'user'


const userMap = {
  admin: {
    user: 'admin',
    status: '0',
    id: '0',
    name: '管理员',
    roles: ['admin', 'user'],
    info: {
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  user: {
    user: 'user',
    status: '0',
    id: '1',
    name: '用户',
    roles: ['user'],
    info: {
      introduction: '我是普通用户',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    }
  },
  none: {
    user: 'none',
    status: '0',
    id: '-1',
    name: '访客',
    roles: [],
    info: {
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {

    console.info("mock getUserInfo");

    var token = tools.cookies.get(TokenKey);

    if (token == null || token == "") {
      return userMap.none
    }

    if (token == admin_token) {
      return userMap.admin
    }

    if (token == user_token) {
      return userMap.user
    }

    return userMap.none
  },
  logout: () => 'success'
}
