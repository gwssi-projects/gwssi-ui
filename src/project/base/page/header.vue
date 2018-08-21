
<template>

  <div id="header">
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <div class="container">

        <el-row>
          <el-col :span="18">
            <!--
               mode 	模式  	horizontal,vertical, 水平和垂直
               default-active 	当前激活菜单的 index，这里绑定路由的名称 this.$route.name
               unique-opened 	是否只保持一个子菜单的展开，可以使用多级菜单
               router 	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
             -->
            <el-menu :default-active="activeName" :router="menuRouter" class="gw-el-menu" mode="horizontal" @select="selectItems">
              <el-menu-item index="login">{{ $t('gwssi.tips.loginBtn') }}</el-menu-item>
              <el-menu-item index="register">{{ $t('gwssi.tips.registerBtn') }}</el-menu-item>
              <el-menu-item index="logged">{{ $t('gwssi.tips.loggedBtn') }}</el-menu-item>
              <el-menu-item index="form">{{ $t('gwssi.tips.formBtn') }}</el-menu-item>
              <el-menu-item index="grid">{{ $t('gwssi.tips.gridBtn') }}</el-menu-item>
              <el-menu-item index="button">{{ $t('gwssi.tips.buttonBtn') }}</el-menu-item>
              <el-menu-item index="portal">{{ $t('gwssi.tips.portalBtn') }}</el-menu-item>
            </el-menu>
          </el-col>

          <el-col :span="6">
            <gw-select-lang></gw-select-lang>
          </el-col>

        </el-row>

      </div>
    </header>

  </div>
</template>

<script>
export default {
  mounted: function() {
    console.log(i18n.t("gwssi.title.gwssi"));
  },
  methods: {
    selectItems(index) {
      console.log(index);
    }
  },
  data() {
    return {
      headerFixed: true,
      //根据路由获取激活菜单选中对象
      activeName:
        this.$route.name == "" || this.$route.name == "index"
          ? "login"
          : this.$route.name,
      menuRouter: true
    };
  },
  metaInfo: {
    //标题国际化
    title: i18n.t("gwssi.title.gwssi")
  }
};
</script>

<style  lang="less" scoped>
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);

header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: @baseBC;
  color: @baseTextColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

header .el-menu {
  background-color: transparent !important;
}

.gw-el-menu {
}

div.container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

#select-lang {
  margin-top: 10px;
  float: right;
  width: 200px;
}

/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  border: solid 40px #e9ecf1;
  background-color: #fcfcfc;
  margin-top: 80px;
}
</style>



