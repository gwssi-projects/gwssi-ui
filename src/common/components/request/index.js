import axios from 'axios'
import { Message } from 'element-ui'
import { Notification } from 'element-ui'
import store from '@store'
import { TokenKey } from '@store/user'


//在一些切换频率较低的情况下，在切换到另一个页面的时候，上一个页面基本没有未完成的异步请求，即时有，在一些情况下也是可以忽略的。
//可以通过使用CancelToken来取消axios发起的请求，我们可以自己写一段代码来验证。
const CancelToken = axios.CancelToken
export const errDes = 'errDes'
export const errNo = 'errNo'
export const content = 'content'

var cancel;

// create an axios instance
const service = axios.create({
  //请求的时候直接写绝对路径,default baseurl就会失效
  //这部分和api.js对应
  baseURL: process.env.DOMAIN,
  timeout: 5000
})

// request interceptor
//添加请求拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求header携带token--
      config.headers[TokenKey] = store.getters.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error)
    // 静态函数Promise.reject返回一个被拒绝的Promise对象。通过使用Error的实例获取错误原因reason对调试和选择性错误捕捉很有帮助。
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,

  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态,可以根据项目情况自定义封装统一判断错误标识
   * 这里使用 errNo 和 errDes
   */
  response => {

    if (response.data == null) {
      return response;
    }

    const no = response.data[errNo]
    if (no != null) {

      if (no != "" && no != "0") {

        Notification({
          title: i18n.t("gwssi.tips.ajaxErr"),
          type: 'error',
          message: response.data[errNo] + ' - ' + response.data[errDes]
        });

        //返回一个被拒绝的promise对象，这样才能触发promise的reject方法
        return Promise.reject(response)

      }

      return response

    } else {
      return response
    }
  },

  //箭头函数 相当于function(error){
  error => {
    //服务器错误
    console.log("服务器错误" + error)
    //elementUI的message
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })

    Notification({
      title: i18n.t("gwssi.tips.ajaxErr"),
      type: 'error',
      message: error.message
    });

    //返回一个被拒绝的promise对象，这样才能触发promise的reject方法
    return Promise.reject(error)
  }
)

export default {

  //axios  的使用方式，直接获取service不实用get post封装的话可以使用下面的方式
  // axios.post('/user', { 
  // firstName: 'Fred', 
  // lastName: 'Flintstone' 
  // }) 
  // .then(function (response) { 
  // console.log(response); 
  // }) 
  // .catch(function (error) { 
  // console.log(error); // }); 

  service: service,

  //get的话如果param提交的是json也会封装成参数字符串
  //post的话如果param是json那body提交的就是json
  //get请求 
  get(url, param) {

    //axios本身就是基于Promise 
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => { cancel = c })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        //Promise.reject(error)
        reject(err)
      })
    })
  },

  //post请求 
  post(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        //post这里用的是data
        data: param,
        cancelToken: new CancelToken(c => { cancel = c })
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

