<template>

  <el-container>

    <el-header style="padding: 0px">

      <div class="container" :style="{ 'border-top-color': storeColor }">
        <el-row>

          <el-col :span="10" :offset="2">
            <img src="./images/logo_tittle.png">
          </el-col>

          <el-col v-show="false" :span="2">
            <gw-select-lang></gw-select-lang>
          </el-col>

          <el-col v-show="false" :span="2">
            <el-badge :hidden="badgeHidden" :value="$t('gwssi.tips.colorPickerItem')" class="colorPickerItem">
              <gw-color-picker @colorChange="colorChange" @activeChange="activeChange" :obj='themeObj'></gw-color-picker>
            </el-badge>
          </el-col>
        </el-row>
      </div>

    </el-header>

    <el-main id="app-main" :style="{ 'background-color': storeColor }">

      <div class="login-box">
        <div class="logo" :style="{ 'color': storeColor }">
          <i class="iconfont icon-edit_code"></i>
        </div>
        <p class="text-tips-login">欢迎访问大数据检索管理系统-isearch，请系统登录。</p>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
          <el-form-item prop="username" :error="usernameErrorMsg">
            <el-input v-model="ruleForm.username" suffix-icon="iconfont icon-icon_wode_mian" :placeholder="$t('gwssi.tips.user')"></el-input>
          </el-form-item>
          <el-form-item prop="password" :error="passwordErrorMsg">
            <el-input type="password" v-model="ruleForm.password" suffix-icon="iconfont icon-icon_wenben_mian" :placeholder="$t('gwssi.tips.password')"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center; margin-top: 10px;">
            <el-button type="primary" native-type="button" :loading="loginBtnLoading" class="loginBtn" @click="submitForm('ruleForm')">{{ $t('gwssi.portal.loginBtn') }}</el-button>
            <el-button native-type="button" class="loginBtn" @click="resetForm('ruleForm')">{{ $t('gwssi.portal.resetBtn') }}</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-main>

    <el-footer>
      <p class="text-tips">
        <i class="el-icon-warning"></i> 版权所有：长城计算机软件与系统有限公司
      </p>

    </el-footer>

  </el-container>

</template>


<script>
import GwTheme from "@components/theme/";
import Vue from "vue";

Vue.use(GwTheme);

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

  beforeCreate: function() {
    this.$store.dispatch("setThemeColor", "#16596d");
  },

  data() {
    return {
      badgeHidden: false,
      themeObj: {},
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

  methods: {
    colorChange(color) {
      this.badgeHidden = true;
    },
    activeChange(color) {},

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

                this.$notify({
                  title: i18n.t("gwssi.portal.loginSuccess"),
                  message: i18n.t("gwssi.portal.welcome"),
                  type: "success"
                });

                this.$router.push("/");
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
    }
  }
};
</script>


<style lang="less" scoped>
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);
@margintop : 10px;

.container {
  transition: all 0.5s ease;
  border-top: solid 4px;
  color: @baseTextColor;
  width: 100%;
  padding: 10px 0 10px 0;
}

.login-box {
  width: 375px;
  height: 310px;
  padding: 20px;
  background-color: #fff;
  text-align: left;
  border-radius: 4px;
  display: block;
  margin-top: 10px;
  position: absolute;
  right: 100px;
}

/**使用字体图标或svg图标来控制整个主题颜色**/
.login-box .logo {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}

.icon-edit_code {
  font-size: 80px;
}

.login-box .loginBtn {
  width: 45%;
}

.text-tips {
  text-align: center;
  color: #909db7;
  margin-top: 25px;
}

.text-tips-login {
  text-align: center;
  color: #909db7;
  margin-top: 15px;
}

#app-main {
  background: url(./images/ne_loginbg.png) left center #16596d no-repeat;
  margin-top: 20px;
  height: 410px;
}
</style>