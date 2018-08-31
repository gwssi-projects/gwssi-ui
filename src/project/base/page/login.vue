
<template>
  <div class="login-box">
    <div class="logo" :style="{ 'color': storeColor }">
      <i class="iconfont icon-shenfenzheng"></i>
    </div>
    <p class="text-tips">你好｛{{uName}}｝，欢迎登录</p>
    <!--status-icon 为反馈图标-->

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <p class="text-tips">使用用户admin/admin，user/user来测试不同用户权限，使用其它用户密码测试登录不正确返回结果。</p>
      <!--点击后加载状态 :loading="true"-->
      <el-button type="primary" :loading="loginBtnLoading" class="loginBtn" @click="submitForm('ruleForm')">登&nbsp;&nbsp;&nbsp;录</el-button>
    </el-form>
    <p class="text-tips">
      <i class="el-icon-edit"></i> ©make by VUE + ELEMENT UI
    </p>
  </div>
</template>


<script>
export default {
  name: "login",

  computed: {
    storeColor() {
      return this.$store.getters.defaultColor;
    },
    uName() {
      return this.$store.state.user.name;
    }
  },

  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loginBtnLoading: false
    };
  },

  props: {
    obj: Object
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginBtnLoading = true;

          this.$store
            .dispatch("login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(
              function(json) {
                //更新用户
                //判断用户密码
                this.loginBtnLoading = false;
              },
              function(error) {
                //服务器错误
                this.loginBtnLoading = false;
              }
            );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style  lang="less" scoped>
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

.login-box .loginBtn {
  width: 100%;
}
</style>


