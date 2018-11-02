<template>

  <el-container>

    <el-header style="padding: 0px; height: 80px;">

      <div class="container" :style="{ 'border-top-color': storeColor }">
        <el-row>

          <el-col :span="6" :offset="2">
            <img style=" float: left" src="/static/img/title.png">
            <!-- <h1 style=" float: left; color: #222222;">ISearch 管理控制台</h1> -->
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
          <img src="/static/img/isearch.png" width="80" height="80" title="智能化大数据检索系统" />
        </div>
        <p class="text-tips-login">欢迎访问智能化大数据检索系统，请系统登录。</p>
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
import request from "@components/request";
import { encryptedPassword } from "./rsa";
import api from "@/common/api";
import { TokenKey } from "@store/user";
var parseString = require("xml2js").parseString;

Vue.use(GwTheme);

export default {
  name: "login",

  computed: {
    storeColor() {
      var color = this.$store.getters.themeColor;
      return "#145A6F";
    },
    uName() {
      return this.$store.state.user.name;
    }
  },

  beforeCreate: function() {
    // var color = this.$store.getters.themeColor;
    // if (color == "") {
    //   this.$store.dispatch("setThemeColor", "#16596d");
    // }
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

          var pw = encryptedPassword(this.ruleForm.password);
          console.log("加密后密码" + pw);

          this.$store
            .dispatch("login", {
              username: this.ruleForm.username,
              // password: this.ruleForm.password
              password: pw
            })
            .then(
              xml => {
                //更新用户
                this.loginBtnLoading = false;

                //烽火台的用户对象
                // <?xml version="1.0" encoding="UTF-8"?>
                // <context>
                // <error-code>TXN102</error-code>
                // <error-desc>错误代码[TXN102] ==&gt; 读取用户信息时错误，用户不存在</error-desc>
                // <flowno>12AQ0T7DGR0100C8</flowno>
                // </context>

                // <context><error-code>000000</error-code><flowno>12AQ0T94900100CA</flowno><username>sa</username><multiuser/>
                // <password>UUN09T4pou2+=</password><validatecode/>
                // <user><username/><operName>sa</operName><fullName>管理员</fullName><roleList>10BN0DACUT0103FC</roleList></user></context>

                // {"context":{"error-code":"TXN102","error-desc":"错误代码[TXN102] ==> 读取用户信息时错误，用户不存在","flowno":"12AQ0UHSAU0100DF"}}
                // {"context":{"error-code":"000000","flowno":"12AQ0UJEV80100E1","username":"sa","multiuser":"","password":"+/KDs+/e1z6u2+=","validatecode":"",
                //"user":{"username":"","operName":"sa","fullName":"管理员","roleList":"10BN0DACUT0103FC"}}}

                var json;

                parseString(xml.data, function(err, result) {
                  console.log(JSON.stringify(result));
                  json = result;
                });

                var errNO = json.context["error-code"];
                var errDesc = json.context["error-desc"];

                if (errNO == "TXN102") {
                  this.usernameErrorMsg = i18n.t("gwssi.portal.nouser");
                }

                if (errNO == "TXN103") {
                  this.passwordErrorMsg = i18n.t("gwssi.portal.passwordError");
                }

                //其它错误
                if (errNO != "000000") {
                  this.$message({
                    type: "error",
                    message: errNO + " - " + errDesc
                  });

                  // this.$notify({
                  //   title: "登录发生错误",
                  //   type: "error",
                  //   message: errNO + " - " + errDesc
                  // });
                  return;
                }

                //更新用户对象
                var user = json.context.user;
                user.user = json.context.username;
                user.status = "0";
                //没有ID？
                user.id = "0";
                user.name = user.fullName;
                user.roles = ["user", "admin"];
                user.info = {};

                this.$store.dispatch("updateUserInfo", user);

                //这里更新的是token时间 正常同一个域名下应该由后端统一更新cookie保持一致
                gwTools.setCookie(TokenKey, "admin_token", 1 / 48, "/");

                //登录protal 记录token为引入iframe
                this.$emit("loginProtal");

                this.$message({
                  message: i18n.t("gwssi.portal.welcome"),
                  type: "success"
                });

                // this.$notify({
                //   title: i18n.t("gwssi.portal.loginSuccess"),
                //   message: i18n.t("gwssi.portal.welcome"),
                //   type: "success"
                // });

                this.$router.push("/");
              },
              error => {
                console.log(i18n.t("gwssi.portal.loginError") + error);
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
  background: url(./images/ne_loginbg.png) left center#145A6F no-repeat;
  margin-top: 20px;
  height: 410px;
}
</style>