
import tools from "../components/tools";
import { TokenKey } from '../../common/store/user'

import { errNo } from '../../common/components/request'
import { errDes } from '../../common/components/request'
import { content } from '../../common/components/request'

const admin_token = 'admin_token'
const user_token = 'user_token'

const admin_pw = 'admin'
const user_pw = 'user'

var json = {};
json[errNo] = '0'
json[errDes] = ''
json[content] = ''

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

    console.log(config.url);
    console.log(config.type);
    console.log(config.body);

    var jsonObj = tools.deepClone(json);
    var obj = tools.param2Obj(config.url);

    var username = obj.user;
    var password = obj.password;

    if (username == null || username == "" || username != "admin" || username != "user") {
      jsonObj[errNo] = "01";
      jsonObj[errDes] = "用户不存在";
      return jsonObj;
    }

    jsonObj.content = userMap[username];
    return jsonObj
  },
  getUserInfo: config => {

    console.info("mock getUserInfo");

    var jsonObj = tools.deepClone(json);
    var token = tools.cookies.get(TokenKey);

    if (token == null || token == "") {
      jsonObj[content] = userMap.none;
      return jsonObj
    }

    if (token == admin_token) {
      jsonObj[content] = userMap.admin;
      return jsonObj
    }

    if (token == user_token) {
      jsonObj[content] = userMap.user;
      return jsonObj
    }
    jsonObj[content] = userMap.none;
    return jsonObj
  },
  logout: () => 'success'
}
