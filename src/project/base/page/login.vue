<template>
  <div class="login-box">
    <div class="logo" :style="{ 'color': storeColor }">
      <i class="iconfont icon-shenfenzheng"></i>
    </div>
    <p class="text-tips">{{ $t('gwssi.tips.hello') }}｛{{uName}}｝~</p>
    <!--status-icon 为反馈图标-->

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" v-show="islogin">
      <el-form-item prop="username" :error="usernameErrorMsg">
        <el-input v-model="ruleForm.username" :placeholder="$t('gwssi.tips.user')"></el-input>
      </el-form-item>
      <el-form-item prop="password" :error="passwordErrorMsg">
        <el-input type="password" v-model="ruleForm.password" :placeholder="$t('gwssi.tips.password')"></el-input>
      </el-form-item>
      <p class="text-tips">使用用户admin/admin，user/user来测试不同用户权限，可以测试用户密码错误提示，使用其它用户密码测试登录不正确返回结果的样例。</p>
      <!--点击后加载状态 :loading="true"-->
      <el-form-item style="text-align: center;">
        <el-button type="primary" native-type="button" :loading="loginBtnLoading" class="loginBtn" @click="submitForm('ruleForm')">{{ $t('gwssi.portal.loginBtn') }}</el-button>
        <el-button native-type="button" class="loginBtn" @click="resetForm('ruleForm')">{{ $t('gwssi.portal.resetBtn') }}
        </el-button>
      </el-form-item>
    </el-form>

    <div class="logged" v-show="islogged">
      <p class="text-tips">当前用户已登录系统</p>
      <div class="user-ctrl">
        <el-button type="primary" native-type="button" class="loginBtn" @click="logout" style=" width: 95%;">{{ $t('gwssi.portal.logoutBtn') }}</el-button>
      </div>
    </div>

    <p class="text-tips">
      <i class="el-icon-edit"></i> ©make by VUE + ELEMENT UI
    </p>
  </div>
</template>


<script>
import { userLogout } from "@appBase/utils/auth";
import { Message } from "element-ui";

export default {
  name: "login",

  computed: {
    storeColor() {
      return this.$store.getters.defaultColor;
    },
    uName() {
      return this.$store.state.user.name;
    },
    islogin() {
      if (this.$store.state.user.user == "none") {
        return true;
      }
      return false;
    },
    islogged() {
      if (this.$store.state.user.user == "none") {
        return false;
      }
      return true;
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
          {
            required: true,
            message: i18n.t("gwssi.portal.inputUser"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: i18n.t("gwssi.portal.inputPassword"),
            trigger: "blur"
          }
        ]
      },
      loginBtnLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: ""
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
          //在请求前将错误信息置空，否则errorMsg只会响应一次(内容相同的话)
          this.loginBtnLoading = true;
          this.usernameErrorMsg = "";
          this.passwordErrorMsg = "";

          this.$store
            .dispatch("login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(
              json => {
                //更新用户
                //判断用户密码
                this.loginBtnLoading = false;
                this.$store.dispatch("updateUserInfo", json.data.content);

                Message({
                  message: i18n.t("gwssi.portal.loginSuccess"),
                  type: "success",
                  duration: 5 * 1000
                });

                this.$router.push("/logged");
              },
              error => {
                console.log(i18n.t("gwssi.portal.loginError") + error);
                //服务器错误
                this.loginBtnLoading = false;

                var errNO = error.data.errNo;
                if (errNO == "01") {
                  this.usernameErrorMsg = i18n.t("gwssi.portal.nouser");
                }

                if (errNO == "02") {
                  this.passwordErrorMsg = i18n.t("gwssi.portal.passwordError");
                }
              }
            );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logout() {
      // this.$alert("确认退出系统？", "提示", {
      //   confirmButtonText: "确定",
      //   //箭头函数可以使用this
      //   callback: action => {
      //     userLogout(this.$store, this.$router);
      //   }
      // });

      this.$confirm("即将退出系统, 是否继续?", i18n.t("gwssi.tips.tip"), {
        confirmButtonText: i18n.t("gwssi.tips.confirm"),
        cancelButtonText: i18n.t("gwssi.tips.cancel"),
        type: "warning"
      })
        .then(() => {
          userLogout(this.$store, this.$router);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>


<style lang="less" scoped>
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
  width: 45%;
}
</style>