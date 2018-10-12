<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view :storeColor='storeColor'></router-view>
    <iframe :src="login999999" v-show="false"></iframe>
  </div>

</template>

<script>
import tools from "@components/tools";
import { TokenKey } from "@store/user";

export default {
  name: "isearch",
  metaInfo: {
    //标题国际化
    title: i18n.t("gwssi.portal.title")
  },
  data() {
    return {
      login999999: "https://isearch.link/txn999999.ajax?username=sa&password=UUN09T4poqDw0FjjCF0Y0EGin29A64IU3X2djsqO5iwF9PoVnJ4AY65SedsA56F0J3OPL%2BHOKrntlgF3bLJQRBGN1CJRBna3cGER0yRcR%2FKDs%2BmcgaRetJ6mvv3J3TL%2Fe1z6u2%2BlOmaZQvNyxRyuIGDKD1B7geANQLTy8vtq2BI%3D"
    };
  },
  computed: {
    storeColor() {
      //更新a标签主题颜色
      gwTools.writeNewAStyle(this.$store.getters.themeColor);
      return this.$store.getters.themeColor;
    }
  },

  methods: {
    loginProtal() {
      console.log("login999999");
      //登录protal 记录token为引入iframe
      this.login999999 = "";
      this.login999999 =
        "https://isearch.link/txn999999.ajax?username=sa&password=UUN09T4poqDw0FjjCF0Y0EGin29A64IU3X2djsqO5iwF9PoVnJ4AY65SedsA56F0J3OPL%2BHOKrntlgF3bLJQRBGN1CJRBna3cGER0yRcR%2FKDs%2BmcgaRetJ6mvv3J3TL%2Fe1z6u2%2BlOmaZQvNyxRyuIGDKD1B7geANQLTy8vtq2BI%3D";
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
