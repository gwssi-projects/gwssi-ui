//生产环境对象的domain直接更改config文件下的地址即可
//接口地址可以直接修改此文件
//process.env.DOMAIN 配置在了request的js中，如果有多个domain需要在这里配置完整路径

export default {

    gwssi: {
        user: {
            login: process.env.REQUEST_PATH + "/user/login",
            logout: process.env.REQUEST_PATH + "/user/logout",
            info: process.env.REQUEST_PATH + "/user/info"
        }
    },

    app: {

    },

    portal: {

        menu: {}

    }

};