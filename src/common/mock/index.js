import Mock from 'mockjs'
import userAPI from '@mock/user'
import grid from '@mock/grid'
import apiUrl from '@/common/api'
// import articleAPI from './article'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'


//判读是否是生产环境 如果是生产环境则不引入mock组件
if (process.env.NODE_ENV === 'development') {

    Mock.setup({
        timeout: '350-600'
    })

    // 登录相关
    Mock.mock(apiUrl.gwssi.user.login.rurl, 'get', userAPI.loginByUsername)
    Mock.mock(apiUrl.gwssi.user.logout.rurl, userAPI.logout)
    Mock.mock(apiUrl.gwssi.user.info.rurl, userAPI.getUserInfo)

    // GRID相关
    Mock.mock(apiUrl.gwssi.grid.list.rurl, 'get', grid.gridDemo1)


}

export default Mock