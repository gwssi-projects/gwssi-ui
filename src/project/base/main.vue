
<template>

  <!--<el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。-->
  <el-container>

    <el-header>
      <app-header @colorChange="colorChange" :defaultColor='themeColor'></app-header>
    </el-header>

    <el-main>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view :defaultColor='themeColor'></router-view>
    </el-main>

    <el-footer>
      <app-footer :defaultColor='themeColor'></app-footer>
    </el-footer>

  </el-container>

</template>


<script>
import AppHeader from "./page/header";
import AppFooter from "./page/footer";

export default {
  mounted: function() {
    console.log("title = " + this.$t("gwssi.title.gwssi"));
  },

  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    selectItems(index) {
      console.log(index);
    },
    colorChange(color) {
      this.themeColor = color;
    }
  },
  data() {
    return {
      //默认颜色
      themeColor: "#e9ecf1"
      //themeColor: "#409eff"
    };
  }
};
</script>
