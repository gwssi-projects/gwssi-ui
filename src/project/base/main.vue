
<template>

  <!--<el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。-->
  <el-container :storeColor="storeColor">

    <el-header>
      <app-header></app-header>
    </el-header>

    <el-main id="app-main">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </el-main>

    <el-footer>
      <app-footer></app-footer>
    </el-footer>

  </el-container>

</template>


<script>
import AppHeader from "./page/header";
import AppFooter from "./page/footer";

export default {
  beforeCreate() {},

  created() {
    //删除loading层，此时加载完毕所有JS
    try {
      document.body.removeChild(document.getElementById("appLoading"));
    } catch (e) {
      console.error(e);
    }

    this.$nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      // loadingInstance.close();
    });

    //用户登录
    this.$store.dispatch("getUserInfo");
  },

  metaInfo: {
    //标题国际化
    //meatInfo 为vuemeta标签返回对象，无法使用this.$t("gwssi.title.gwssi")？只能使用全局注册的 i18n
    title: i18n.t("gwssi.title.gwssi")
  },

  mounted: function() {
    console.log("title = " + this.$t("gwssi.title.gwssi"));
  },

  components: {
    AppHeader,
    AppFooter
  },

  //主题颜色更新监控（storeColor必须在html中被调用才能监控，在当前控件或者父控件中调用都可以生效）
  computed: {
    storeColor() {
      console.log("更新项目UI颜色" + this.$store.getters.defaultColor);
      //更新a标签主题颜色
      var cssText =
        "a {color:" +
        this.$store.getters.defaultColor +
        ";}  a:focus, a:hover {color:" +
        this.$store.getters.defaultColor +
        ";}";

      this.writeNewStyle(cssText);

      return this.$store.getters.defaultColor;
    }
  },

  watch: {},

  methods: {
    selectItems(index) {
      console.log(index);
    },

    writeNewStyle(cssText) {
      if (cssText == null || cssText == "") {
        console.log("cssText is null!!");
        return;
      }

      var style = document.getElementById("app_theme_style");
      if (style == null) {
        style = document.createElement("style");
        style.id = "app_theme_style";
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        // console.log("再次设置");
        style.innerText = cssText;
      }
    }
  },
  data() {
    return {};
  }
};
</script>
