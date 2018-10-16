import tools from '@components/tools'
import {
  Message
} from 'element-ui'

//统一的登出操作
export function userLogout(store, router) {

  store.dispatch("logOut", {}).then(
    json => {
      store.dispatch("updateUserInfo", {
        user: 'none',
        status: '0',
        id: '-1',
        name: '访客',
        roles: [],
        info: {}
      }, );

      Message({
        message: "登出成功",
        type: 'success',
        duration: 5 * 1000
      })

      router.push('/login');

    },
    error => {
      console.log("登出发生错误" + error);
    }
  );


}