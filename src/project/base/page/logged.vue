<template>
  <div class="user-panel animated fadeInUp">

    <div class="logo" :style="{ 'color': storeColor }">
      <i class="iconfont icon-wodedamaijihuo"></i>
    </div>

    <h1 class="user-code">用户信息</h1>

    <p class="user-description">用户ID ：{{$store.state.user.user}}</p>
    <p class="user-description">用户名 ：{{$store.state.user.name}}</p>
    <p class="user-description">用户状态 ：{{$store.getters.status}}</p>
    <p class="user-description">用户权限 ：{{$store.state.user.roles}}</p>
    <p class="user-description">用户描述 ：{{$store.state.user.info.introduction}}</p>
    <p class="user-description">用户最后登录时间 ：{{$store.state.user.info.lastLoginTime}}</p>

    <div class="user-ctrl">
      <el-button @click="$router.back()">返回</el-button>
      <el-button @click="logout" type="danger">登出</el-button>
    </div>

    <p class="copyright">@{{$store.state.user.user}} 版权所有</p>
  </div>
</template>

<script>
export default {
  name: "logged",

  methods: {
    logout(formName) {
      this.$store.dispatch("logOut", {}).then(
        json => {
          //需要重新刷新用户，可以直接设置sotre user
          this.$store.dispatch("getUserInfo");

          this.$alert("登出成功", "提示", {
            confirmButtonText: "确定",
            //箭头函数可以使用this
            callback: action => {
              //跳转登录后页面
              this.$router.back();
            }
          });
        },
        error => {
          console.log("登出发生错误" + error);
        }
      );
    }
  },

  computed: {
    storeColor() {
      return this.$store.getters.defaultColor;
    }
  }
};
</script>

<style type="text/css" scoped>
.user-panel {
  position: relative;
  width: 360px;
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-family: Roboto, Segoe UI, "Microsoft YaHei";
}

/**使用字体图标或svg图标来控制整个主题颜色**/
.user-panel .logo {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}

.user-panel .icon-wodedamaijihuo {
  font-size: 60px;
}

.user-panel .user-code {
  font-size: 2rem;
  font-weight: 30;
  text-align: center;
  margin: 0;
}
.user-panel .user-description {
  text-align: center;
  margin-bottom: 5px;
}
.user-panel .user-ctrl {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.user-panel .copyright {
  text-align: center;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>
