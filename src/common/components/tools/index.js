export default {
  //设置cookie
  setCookie: function (cname, cvalue, exdays, path) {

    var expires = "";
    //不设置时间的话为回话cookie 关闭浏览器清除
    if (exdays != null) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toUTCString() + "; ";
    }

    var path = "path=" + path;
    var cookieStr = cname + "=" + cvalue + "; " + expires + path;
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
      strs = str.split("&");
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
    if (r != null) return (r[2]); return null;

  }


}