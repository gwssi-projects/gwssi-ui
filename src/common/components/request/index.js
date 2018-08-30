import axios from 'axios'
import { Message } from 'element-ui'
import store from '../../store'


// create an axios instance
const service = axios.create({
  //请求的时候直接写绝对路径,default baseurl就会失效
  //这部分和api.js对应
  baseURL: process.env.DOMAIN, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
//添加请求拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求header携带token-- key和value都从用户的store中获取，用于特殊环境处理
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    // 静态函数Promise.reject返回一个被拒绝的Promise对象。通过使用Error的实例获取错误原因reason对调试和选择性错误捕捉很有帮助。
    Promise.reject(error)
  }
)


// private String stateCode;
// private String errorDescription; 
// private Object data;

// respone interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  //箭头函数 相当于function(error){
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)





export default {

  service: service,

  //get请求 
  get(url, param) {

    //promise示例 
    // axios.post('/user', { 
    // firstName: 'Fred', 
    // lastName: 'Flintstone' 
    // }) 
    // .then(function (response) { 
    // console.log(response); 
    // }) 
    // .catch(function (error) { 
    // console.log(error); 
    // }); 
    return new Promise((resolve, reject) => {
      service({ method: 'get', url, params: param, cancelToken: new CancelToken(c => { cancel = c }) }).then(res => {
        //axios返回的是一个promise对象 resolve(res) 
        //resolve在promise执行器内部 
      }).catch(err => { console.log(err, '异常') })
    })
  },
  //post请求 
  post(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post', url, data: param,
        cancelToken: new CancelToken(c => { cancel = c })
      }).then(res => { resolve(res) }).catch(err => { console.log(err, '异常') })
    })
  }
}

