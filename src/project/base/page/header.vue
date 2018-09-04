<template>

  <div class="container" :style="{ 'border-top-color': storeColor }">

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
          <el-menu-item index="logged">{{ $t('gwssi.tips.loggedBtn') }}</el-menu-item>

          <el-submenu index="routerTmp">
            <template slot="title">{{ $t('gwssi.tips.routerTitle') }}</template>
            <el-menu-item index="router2">{{ $t('gwssi.tips.routerBtn') }}</el-menu-item>
            <el-menu-item index="syncRouter">{{ $t('gwssi.tips.syncRouterBtn') }}</el-menu-item>
          </el-submenu>

          <el-menu-item index="button">{{ $t('gwssi.tips.buttonBtn') }}</el-menu-item>
          <el-menu-item index="form">{{ $t('gwssi.tips.formBtn') }}</el-menu-item>
          <el-menu-item index="grid">{{ $t('gwssi.tips.gridBtn') }}</el-menu-item>

          <el-submenu index="page">
            <template slot="title">{{ $t('gwssi.tips.page') }}</template>
            <el-menu-item index="page404">{{ $t('gwssi.tips.btn404') }}</el-menu-item>
            <el-menu-item index="page500">{{ $t('gwssi.tips.btn500') }}</el-menu-item>
          </el-submenu>

          <el-menu-item index="portal">{{ $t('gwssi.tips.portalBtn') }}</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="2">
        <gw-select-lang></gw-select-lang>
      </el-col>

      <el-col :span="1" :offset="1">
        <el-badge :hidden="badgeHidden" :value="$t('gwssi.tips.colorPickerItem')" class="colorPickerItem">
          <gw-color-picker @colorChange="colorChange" @activeChange="activeChange" :obj='themeObj'></gw-color-picker>
        </el-badge>
      </el-col>

    </el-row>

  </div>

</template>

<script>
import GwTheme from "../../../common/components/theme/";
import Vue from "vue";

Vue.use(GwTheme);

export default {
  name: "app-header",
  beforeMount: function() {},

  props: {
    obj: Object
  },

  mounted: function() {},

  //GwTheme如果注册成局部组件，不使用Vue.use(GwTheme);直接在el-col使用gw-color-picker会提示没有注册，el-col是vue.user(element)注册的全局组件，gw-color-picker和el-col在这里其实应该是同级的？（这里都属于app-header的子组件了）
  //所以会提示找不到（因为应该注册在el-col 才能找到而不是当前组件中）?
  // components: {
  //   GwTheme
  // },

  computed: {
    storeColor() {
      return this.$store.getters.defaultColor;
    },
    //其它组件中路由跳转 触发菜单切换 所以需要定义在computed中
    activeName() {
      //根据路由获取激活菜单选中对象
      return this.$route.name == "" || this.$route.name == "index"
        ? "login"
        : this.$route.name;
    }
  },

  methods: {
    selectItems(index) {
      console.log(index);
    },
    colorChange(color) {
      this.badgeHidden = true;
    },
    activeChange(color) {}
  },
  data() {
    return {
      menuRouter: true,
      badgeHidden: false,
      themeObj: {}
    };
  }
};
</script>

<style  lang="less" scoped>
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);
@margintop : 10px;
/***
此处定义的CSS只在此组件中生效，比如下面的.container，只会在当前组件的.container生效，
最终的结果是生成的css为 
.container[data-v-0f61ca50] 
生成的DIV为<div data-v-0f61ca50="" class="container">
保证一一对应
**/
.container {
  transition: all 0.5s ease;
  border-top: solid 4px;
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
  margin-top: @margintop;
  float: right;
  width: auto;
}
.el-color-picker {
}

.colorPickerItem {
  margin-top: @margintop;
}

.el-badge__content {
}
</style>



