
<template>

  <!--<el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。-->
  <el-container>

    <el-header>
      <app-header></app-header>
    </el-header>

    <el-main>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </el-main>

    <el-footer>
      <el-col :span="16" :offset="4" class="el-col">
        <i class="el-icon-share"></i>&nbsp;
        <span class="footer-text">更多基础组件：弹窗、按钮、导航...请参考官方网站：
          <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank">http://element-cn.eleme.io/#/zh-CN</a>
        </span>
      </el-col>
    </el-footer>

  </el-container>

</template>


<script>
import AppHeader from "./page/header";

export default {
  mounted: function() {
    console.log("title = " + this.$t("gwssi.title.gwssi"));
  },
  components: {
    AppHeader
  },
  methods: {
    selectItems(index) {
      console.log(index);
    }
  },
  data() {
    return {};
  }
};
</script>

<style  lang="less" scoped>
.el-col {
  text-align: center;
  color: #909db7;
  padding-top: 20px;
}
</style>