//生产环境对象的domain直接更改config文件下的地址即可
//接口地址可以直接修改此文件

//mockjs加了参数就拦截不到 只能POST或者把参数一开始就拼到 或者是用正则
//process.env.DOMAIN 配置在了request的js中，如果有多个DOMAIN或REQUEST_PATH需要在这里配置完整路径


export default {

    gwssi: {
        user: {
            //地址保持一致 url用于 实际 axios 加载ajax用，rurl是mock拦截的正则式
            login: {
                url: process.env.REQUEST_PATH + "/user/login",
                rurl: /\/user\/login/
            },

            logout: {
                url: process.env.REQUEST_PATH + "/user/logout",
                rurl: /\/user\/logout/
            },

            info: {
                url: process.env.REQUEST_PATH + "/user/info",
                rurl: /\/user\/info/
            }

        },
        grid: {
            list: {
                url: process.env.REQUEST_PATH + "/grid/list",
                rurl: /\/grid\/list/
            }
        }
    },

    app: {

    },

    portal: {

        menu: {}

    }

};