<template>
  <!--布局#侧边导航-->
  <div class="gw-side">
    <div class="project-name-container">
      <img src="../../assets/logo.png" class="home-logo"/>
      <span class="project-name" v-show="!isCollapse">{{projectName}}</span>
      <i class="fa collapse-icon" @click='sideWidthChange' :class="isCollapse?'fa-bars':'fa-outdent'"></i>
    </div>
    <el-menu default-active="/about"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">学习模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/learnVue">学习VUE</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
        </el-menu-item-group>

        <el-submenu index="1-1">
          <span slot="title">二级菜单</span>
          <el-menu-item index="/monitor">实时监控</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">管理模块</span>
        </template>
        <el-menu-item index="/systemManage">
          <span slot="title">系统管理</span>
        </el-menu-item>
      </el-submenu>


    </el-menu>

  </div>
</template>

<script>
export default {
  name: "GWSide",
    props:{
      // 展开宽度
        expanseWidth:{
            type:String,
            default:'200px'
        },
        // 折叠宽度
        collapseWidth:{
            type:String,
            default:'50px'
        }
    },
    data() {
        return {
            isCollapse: false,
            projectName:'大数据平台'
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        sideWidthChange(){
            this.isCollapse=!this.isCollapse;
            this.$emit("widthChange",this.sideWidth)
        }
    },
    computed:{
      sideWidth(){
          return this.isCollapse ? this.collapseWidth :this.expanseWidth;
      }

    }
};
</script>

<style>
  .logo-container{
    display: inline-block;
  }
  .home-logo{

    height: 1em;
    vertical-align: middle;
  }
  .project-name-container {
    height: 60px;
    line-height: 60px;
  }
  .project-name{
    display: inline-block;
    padding: 0 5px;
  }
  .collapse-icon {
    cursor: pointer;
    margin-left:5px;
  }
</style>
