<template>
  <div class="user-panel animated fadeInUp">

    <div class="logo" :style="{ 'color': storeColor }">
      <i class="iconfont icon-damailogo"></i>
    </div>

    <h1 class="user-code">管理员页面(普通用户无法查看)</h1>

    <p class="user-description">用户ID ：{{$store.state.user.user}}</p>
    <p class="user-description">用户名 ：{{$store.state.user.name}}</p>
    <p class="user-description">用户状态 ：{{$store.getters.status}}</p>
    <p class="user-description">用户权限 ：{{$store.state.user.roles}}</p>
    <p class="user-description">用户描述 ：{{$store.state.user.info.introduction}}</p>
    <p class="user-description">用户最后登录时间 ：{{$store.state.user.info.lastLoginTime}}</p>

    <div class="user-ctrl">
      <el-button @click="$router.back()" type="primary">返回</el-button>
      <el-button @click="logout" type="">登出</el-button>
    </div>

    <p class="copyright">@{{$store.state.user.user}} 版权所有</p>
  </div>
</template>

<script>
import "./css/logged.css";
import { userLogout } from "@appBase/utils/auth";

export default {

  methods: {
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
.user-panel .user-code {
    font-size: 1.5rem;
}
</style>
