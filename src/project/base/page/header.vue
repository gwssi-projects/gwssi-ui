<template>

  <div class="container">

    <el-row>
      <!--左右各留出两格的距离 一共24列-->
      <el-col :span="16" :offset="2">
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
          <el-menu-item index="router2">{{ $t('gwssi.tips.routerBtn') }}</el-menu-item>
          <el-menu-item index="page404">{{ $t('gwssi.tips.btn404') }}</el-menu-item>
          <el-menu-item index="page500">{{ $t('gwssi.tips.btn500') }}</el-menu-item>
          <el-menu-item index="portal">{{ $t('gwssi.tips.portalBtn') }}</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="4">
        <gw-select-lang></gw-select-lang>
      </el-col>

    </el-row>

  </div>

</template>

<script>
export default {
  name: "app-header",
  mounted: function() {},
  methods: {
    selectItems(index) {
      console.log(index);
    }
  },
  data() {
    return {
      //根据路由获取激活菜单选中对象
      activeName:
        this.$route.name == "" || this.$route.name == "index"
          ? "login"
          : this.$route.name,
      menuRouter: true
    };
  }
};
</script>

<style  lang="less" scoped>
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);
/***
此处定义的CSS只在此组件中生效，比如下面的.container，只会在当前组件的.container生效，
最终的结果是生成的css为 
.container[data-v-0f61ca50] 
生成的DIV为<div data-v-0f61ca50="" class="container">
保证一一对应
**/
.container {
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: @baseBC;
  color: @baseTextColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
}

.el-menu {
  background-color: transparent !important;
}

.gw-el-menu {
}

#select-lang {
  margin-top: 10px;
  float: right;
  width: 150px;
}
</style>



