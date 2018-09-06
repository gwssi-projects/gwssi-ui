import Cookies from 'js-cookie'


export default {

  //可以直接使用cookies操作cookies
  cookies: Cookies,

  //设置cookie
  setCookie: function (cname, cvalue, exdays, path) {

    var expires = "";
    //不设置时间的话为回话cookie 关闭浏览器清除
    if (exdays != null) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toUTCString() + "; ";
    }

    var _path = "";

    if (path != null && path != "") {
      _path = "path=" + path;
    }

    var cookieStr = cname + "=" + cvalue + "; " + expires + _path;
    console.info(cookieStr);
    document.cookie = cookieStr;
    //console.info(document.cookie);
  },
  //获取cookie
  getCookie: function (cname) {
    var name = cname + "=";
    // debugger
    var ca = document.cookie.split(';');
    //console.log("获取cookie,现在循环")
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      //console.log(c)
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  //获取URL对象
  getRequest: function () {

    //获取url中"?"符后的字串
    var url = location.search;
    var theRequest = new Object();

    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }

    return theRequest;

  },

  //获取参数值
  getQueryString: function (name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;

  },



  parseTime: function (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  formatTime: function (time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  },

  // 格式化时间
  getQueryObject: function (url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  },

  /**
   *get getByteLen
   * @param {Sting} val input value
   * @returns {number} output value
   */
  getByteLen: function (val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/gi) != null) {
        len += 1
      } else {
        len += 0.5
      }
    }
    return Math.floor(len)
  },

  cleanArray: function (actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },
  param: function (json) {
    if (!json) return ''
    return cleanArray(
      Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  },
  param2Obj: function (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
      '"}'
    )
  },
  html2Text: function (val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  },
  objectMerge: function (target, source) {
    /* Merges two  objects,
       giving the last one precedence */

    if (typeof target !== 'object') {
      target = {}
    }
    if (Array.isArray(source)) {
      return source.slice()
    }
    Object.keys(source).forEach(property => {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = this.objectMerge(target[property], sourceProperty)
      } else {
        target[property] = sourceProperty
      }
    })
    return target
  },
  scrollTo: function (element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = (difference / duration) * 10
    setTimeout(() => {
      console.log(new Date())
      element.scrollTop = element.scrollTop + perTick
      if (element.scrollTop === to) return
      scrollTo(element, to, duration - 10)
    }, 10)
  },
  toggleClass: function (element, className) {
    if (!element || !className) {
      return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
      classString += '' + className
    } else {
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length)
    }
    element.className = classString
  },
  getTime: function (type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
      return new Date(new Date().toDateString())
    }
  },
  debounce: function (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp

      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function (...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  },

  /**
   * This is just a simple version of deep copy
   * Has a lot of edge cases bug
   * If you want to use a perfect deep copy, use lodash's _.cloneDeep
   */
  deepClone: function (source) {
    if (source == null || (!source && typeof source !== 'object')) {
      throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  },

  uniqueArr: function (arr) {
    return Array.from(new Set(arr))
  }


}