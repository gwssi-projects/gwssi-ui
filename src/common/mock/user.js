
import tools from "@components/tools";
import { TokenKey } from '@store/user'

import { errNo } from '@components/request'
import { errDes } from '@components/request'
import { content } from '@components/request'

import Mock from 'mockjs'

var Random = Mock.Random

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
    name: '普通用户',
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
    name: '未登录用户',
    roles: [],
    info: {
    }
  }
}

export default {
  loginByUsername: config => {

    console.log("url = " + config.url);
    console.log("type = " + config.type);
    console.log("body = " + config.body);

    var jsonObj = tools.deepClone(json);
    var obj = tools.param2Obj(config.url);

    var username = obj.username;
    var password = obj.password;

    if (username == null || username == "" || (username != "admin" && username != "user")) {
      jsonObj[errNo] = "01";
      jsonObj[errDes] = i18n.t("gwssi.portal.nouser");
      return jsonObj;
    }

    if (username == "admin" && password != "admin") {
      jsonObj[errNo] = "02";
      jsonObj[errDes] = i18n.t("gwssi.portal.passwordError");
      return jsonObj;
    }

    if (username == "user" && password != "user") {
      jsonObj[errNo] = "02";
      jsonObj[errDes] = i18n.t("gwssi.portal.passwordError");
      return jsonObj;
    }

    //增加token
    var _token = "";
    if (username == "admin") {
      _token = admin_token
    }

    if (username == "user") {
      _token = user_token
    }

    //服务端生成token验证解密之后需要有过期时间 不要再像烽火台一样token没有过期时间！
    tools.setCookie(TokenKey, _token, 10, "/");
    jsonObj[content] = userMap[username];
    jsonObj[content].info.lastLoginTime = Random.datetime('yyyy-MM-dd A HH:mm:ss')

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
      jsonObj[content].info.lastLoginTime = Random.datetime('yyyy-MM-dd A HH:mm:ss')
      return jsonObj
    }

    if (token == user_token) {
      jsonObj[content] = userMap.user;
      jsonObj[content].info.lastLoginTime = Random.datetime('yyyy-MM-dd A HH:mm:ss')
      return jsonObj
    }
    jsonObj[content] = userMap.none;
    jsonObj[content].info.lastLoginTime = Random.datetime('yyyy-MM-dd A HH:mm:ss')
    return jsonObj
  },
  logout: () => {
    tools.cookies.remove(TokenKey);
    return "ok"
  }
}
