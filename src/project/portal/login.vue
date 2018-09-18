<template>

  <el-container>

    <el-header>

      <div class="container" :style="{ 'border-top-color': storeColor }">
        <el-row>
          <el-col :span="2" :offset="18">
            <gw-select-lang></gw-select-lang>
          </el-col>

          <el-col :span="2" :offset="1">
            <el-badge :hidden="badgeHidden" :value="$t('gwssi.tips.colorPickerItem')" class="colorPickerItem">
              <gw-color-picker @colorChange="colorChange" @activeChange="activeChange" :obj='themeObj'></gw-color-picker>
            </el-badge>
          </el-col>
        </el-row>
      </div>

    </el-header>

    <el-main id="app-main">

      <div class="login-box">
        <div class="logo" :style="{ 'color': storeColor }">
          <i class="iconfont icon-shenfenzheng"></i>
        </div>
        <p class="text-tips">{{ $t('gwssi.portal.welcome') }}</p>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
          <el-form-item prop="username" :error="usernameErrorMsg">
            <el-input v-model="ruleForm.username" :placeholder="$t('gwssi.tips.user')"></el-input>
          </el-form-item>
          <el-form-item prop="password" :error="passwordErrorMsg">
            <el-input type="password" v-model="ruleForm.password" :placeholder="$t('gwssi.tips.password')"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" native-type="button" :loading="loginBtnLoading" class="loginBtn" @click="submitForm('ruleForm')">{{ $t('gwssi.portal.loginBtn') }}</el-button>
            <el-button native-type="button" class="loginBtn" @click="resetForm('ruleForm')">{{ $t('gwssi.portal.resetBtn') }}</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-main>

    <el-footer>
      <p class="text-tips">
        <i class="el-icon-edit"></i> ©make by VUE + ELEMENT UI @gwssi.com.cn
      </p>

      <p class="text-tips">
        <i class="iconfont icon-github"></i> GitHub
        <a href="https://github.com/gwssi-projects/gwssi-ui/tree/1.x" target="_blank">https://github.com/gwssi-projects/gwssi-ui/tree/1.x</a>
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

  metaInfo: {
    //标题国际化
    title: i18n.t("gwssi.portal.login")
  },

  computed: {
    storeColor() {
      //更新a标签主题颜色
      gwTools.writeNewAStyle(this.$store.getters.defaultColor);
      return this.$store.getters.defaultColor;
    }
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

  created() {
    //删除loading层，此时加载完毕所有JS
    try {
      document.body.removeChild(document.getElementById("appLoading"));
    } catch (e) {
      console.error(e);
    }
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
                window.location.href = '../portal/';
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

/***
此处定义的CSS只在此组件中生效，比如下面的.container，只会在当前组件的.container生效，
最终的结果是生成的css为 
.container[data-v-0f61ca50] 
生成的DIV为<div data-v-0f61ca50="" class="container">
保证一一对应
**/
.container {
  transition: all 0.5s ease;
  border-top: solid 4px;
  background-color: @baseBC;
  color: @baseTextColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  padding: 10px 0 10px 0;
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

.login-box .loginBtn {
  width: 45%;
}

.text-tips {
  text-align: center;
  color: #909db7;
}
</style>