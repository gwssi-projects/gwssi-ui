<template>
  <div class="user-panel animated fadeInUp">

    <h1 class="user-code">嵌套路由测试</h1>
    <p class="user-description">用户最后登录时间 ：{{$store.state.user.info.lastLoginTime}}</p>

    <router-view></router-view>

    <div class="user-ctrl">
      <el-button @click="$router.back()" type="primary">返回</el-button>
      <el-button @click="logout" type="">登出</el-button>

      <el-button @click="userName" type="success" icon="el-icon-check" circle></el-button>
      <el-button @click="userID" type="info" icon="el-icon-message" circle></el-button>
    </div>

    <p class="copyright">@{{$store.state.user.user}} 版权所有</p>
  </div>
</template>

<script>
import "./css/logged.css";
import { userLogout } from "@appBase/utils/auth";

export default {

  methods: {
    userName() {
      this.$router.push("/router2/" + this.$store.state.user.user);
    },
    userID() {
      this.$router.push("/router2/" + this.$store.state.user.user + "/profile");
    },
    logout() {
      // this.$alert("确认退出系统？", "提示", {
      //   confirmButtonText: "确定",
      //   //箭头函数可以使用this
      //   callback: action => {
      //     userLogout(this.$store, this.$router);
      //   }
      // });

      this.$confirm("即将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
  width: 500px;
}
</style>
