//生产环境对象的domain直接更改config文件下的地址即可
//接口地址可以直接修改此文件

export default {
    
    gwssi: {
        user: {
            login: process.env.DOMAIN + "/user/login",
            logout: process.env.DOMAIN + "/user/logout",
            info: process.env.DOMAIN + "/user/info"
        }
    },

    app: {

    },

    portal: {

        menu: {}

    }

};