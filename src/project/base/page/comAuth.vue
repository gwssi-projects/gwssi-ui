<template>
  <div class="user-panel animated fadeInUp">

    <h1 class="user-code">页面组件通过权限配置是否显示</h1>

    <p class="user-description">当前用户ID ：{{$store.state.user.user}}，权限 ：{{$store.state.user.roles}}。</p>
    <p class="user-description">通过vue的计算函数computed，监控user store的权限即可轻松控制页面按钮的显示与隐藏（使用v-show或者直接设置display），区域可见原理相同。</p>

    <div class="demosource">
      <div class="demoblock">
        <span class="demonstration">admin可见按钮</span>
        <div class="demobutton">
          <!--可以使用 v-show来判断-->
          <el-button type="primary" size="small" v-show="isAdmin">admin可见</el-button>
          <el-button type="primary" size="small" :disabled="!isAdmin">admin可使用</el-button>
        </div>
      </div>
      <div class="demoblock">
        <span class="demonstration">登录用户可见按钮</span>
        <div class="demobutton">
          <el-button type="primary" size="small" v-show="isUser">user按钮</el-button>
        </div>
      </div>
    </div>

    <div class="user-ctrl">
      <el-button @click="$router.back()" type="primary">返回</el-button>
    </div>

  </div>
</template>

<script>
import "./css/logged.css";
import { userLogout } from "@appBase/utils/auth";

export default {
  methods: {},

  computed: {
    storeColor() {
      return this.$store.getters.themeColor;
    },

    isAdmin() {
      var auth = false;

      for (var n = 0; n < this.$store.state.user.roles.length; n++) {
        var r = this.$store.state.user.roles[n];
        if (r == "admin") {
          auth = true;
        }
      }

      return auth;
    },

    isUser() {
      if (this.$store.state.user.roles.length == 0) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style type="text/css" scoped>
.user-panel {
  width: 600px;
}

.user-panel .user-code {
  font-size: 1rem;
}

.user-panel .user-description {
  text-align: left;
}

.demosource {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin-bottom: 24px;
  padding: 0px;
}

.demosource .demoblock {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}

.demosource .demoblock:last-child {
  border-right: none;
}

.demosource .demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.demosource .demobutton {
  text-align: center;
}
</style>
