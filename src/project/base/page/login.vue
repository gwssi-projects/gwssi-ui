
<template>
  <div class="login-box">
    <div class="logo" :style="{ 'color': defaultColor }">
      <i class="iconfont icon-shenfenzheng"></i>
    </div>
    <p class="text-tips">你好｛用户｝，欢迎登录</p>
    <form action="" class="login-form">
      <div class="m-list-group">
        <div class="m-list-group-item">
          <el-input v-model="username" placeholder="用户名"></el-input>
        </div>
        <div class="m-list-group-item">
          <el-input v-model="password" placeholder="密码"></el-input>
        </div>
      </div>
      <p class="text-tips">使用用户admin/admin，user/user来测试不同用户权限，使用其它用户密码测试登录不正确返回结果。</p>
      <!--点击后加载状态 :loading="true"-->
      <el-button type="primary" :loading="loginBtnLoading" class="loginBtn" @click="handleLogin">登&nbsp;&nbsp;&nbsp;录</el-button>
    </form>
    <p class="text-tips">
      <i class="el-icon-edit"></i> ©make by VUE + ELEMENT UI
    </p>
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      isLoging: false,
      loginBtnLoading: false
    };
  },

  props: {
    //项目中的默认颜色
    defaultColor: String,
    obj: Object
  },

  created() {},

  methods: {
    handleLogin() {
      this.loginBtnLoading = true;
      if (!this.username || !this.password) {
        return this.$message.warning("用户名和密码不能为空");
      }
      this.isLoging = true;
      this.login({
        username: this.username,
        password: this.password
      }).then(res => {
        this.$message.success("登录成功");
        this.$router.push({ name: "home" });
        this.isLoging = false;
      });
    }
  }
};
</script>


<style  lang="less" scoped>
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}
.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  margin-bottom: -1px;
  border: 1px solid #e7ecee;
}
.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.login-box {
  position: relative;
  width: 330px;
  margin: 0 auto;
  padding: 0px 15px;
}
/**使用字体图标或svg图标来控制整个主题颜色**/
.login-box .logo {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}

.icon-shenfenzheng {
  font-size: 60px;
}

.login-box .text-tips {
  text-align: center;
  color: #909db7;
}
.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #36c1fa;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #36c1fa;
  box-sizing: border-box;
  text-decoration: none;
}
.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #36c1fa;
}
.login-box .m-btn:hover {
  background-color: #2db7f5;
}
.login-box .m-btn.m-btn-text:hover {
  background-color: #f4f5f5;
}
.login-box .m-btn:active {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}

.login-box .loginBtn {
  width: 100%;
}
</style>


