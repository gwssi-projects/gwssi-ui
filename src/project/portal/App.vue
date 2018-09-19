<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view :storeColor='storeColor'></router-view>
  </div>
</template>

<script>
import tools from "@components/tools";
import { TokenKey } from "@store/user";

export default {
  name: "gw-portal",
  metaInfo: {
    //标题国际化
    title: i18n.t("gwssi.portal.title")
  },

  computed: {
    storeColor() {
      //更新a标签主题颜色
      gwTools.writeNewAStyle(this.$store.getters.defaultColor);
      return this.$store.getters.defaultColor;
    }
  },

  created() {
    //删除loading层，此时加载完毕所有JS
    try {
      document.body.removeChild(document.getElementById("appLoading"));
    } catch (e) {
      console.error(e);
    }

    //先判断是否有tokenID，没有直接跳转，其它权限判断在router中进行
    var token = tools.cookies.get(TokenKey);
    if (token == null || token == "") {
      this.$router.push("/login");
    }

    //获取用户信息
    this.$store.dispatch("getUserInfo");
  }
};
</script>
