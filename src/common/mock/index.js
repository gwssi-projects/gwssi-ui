import Mock from 'mockjs'
import userAPI from '@mock/user'
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

    // // 文章相关
    // Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
    // Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
    // Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
    // Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
    // Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

    // // 搜索相关
    // Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

    // // 账单相关
    // Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)


}

export default Mock