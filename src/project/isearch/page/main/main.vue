<template>
  <div class="main">
    <div class="header" :style="{ 'background-color': themeColor} ">
      <div class="logo">
        <span class="min"><b><img style="padding: 0px; margin:0px; position: relative; left: 0px; top: 10px;" src="../home/images/logo.png" />&nbsp;&nbsp;&nbsp;iSearch</b></span>
      </div>
      <!--
      <span v-show="false" class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu btn-hiddenSidebar"></i>
      </span>
      -->
      <el-menu router background-color="#373F42" text-color="#fff" active-text-color="#fff" mode="horizontal" :default-active="routePath" class="isearchHorizontalMenu" id="isearchHorizontalMenu" @open="handleOpen" @close="handleClose">

        <template v-for="(menu_v,menu_k) in menu">

          <el-submenu v-if="menu_v.children" :index="'menu' + menu_k" :key="'menu' + menu_k">

            <template slot="title">
              <span slot="title">{{ menu_v.name }}</span>
            </template>

            <template v-for="(menuChildren_v,menuChildren_k) in menu_v.children">

              <el-submenu v-if="menuChildren_v.children" :index="'children1' + menuChildren_k" :key="'children1' + menuChildren_k">

                <template slot="title">
                  <span slot="title">{{ menuChildren_v.name }}</span>
                </template>

                <el-menu-item v-for="(menuChildren2_v) in menuChildren_v.children" :key="menuChildren2_v.path" :index="menuChildren2_v.path">
                  <span slot="title">{{ menuChildren2_v.name }}</span>
                </el-menu-item>

              </el-submenu>

              <el-menu-item v-else :index="menuChildren_v.path" :key="menuChildren_v.path">
                <span slot="title">{{ menuChildren_v.name }}</span>
              </el-menu-item>

            </template>

          </el-submenu>

          <el-menu-item v-else :index="menu_v.path" :key="menu_v.path">
            <span slot="title">{{ menu_v.name }}</span>
          </el-menu-item>

        </template>

        <el-menu-item v-show="false" index="1">用于隐藏default-active不匹配（没办法自己隐藏??）</el-menu-item>
      </el-menu>

      <div class="right">

        <span class="welcome">{{welcome}} 你好 {{uName}} !</span><span title="个人信息" @click="openPersonal" class="icon-btn"><i class="icon iconfont icon-icon_zhanghao"></i></span><span title="个人信息" @click="openPersonal" class="icon-btn"><i class="icon iconfont icon-icon_bangzhuwendang"></i></span><span title="退出系统" @click="logout" class="icon-btn"><i class="icon iconfont icon-icon_rukou"></i></span>

        <!-- 
        <span v-show="false" class="header-btn">
          <gw-color-picker class="btn-color-picker" style="padding-top: 11px" size="mini" @colorChange="colorChange" @activeChange="activeChange" :obj='themeObj'></gw-color-picker>
        </span>

        <span v-show="false" class="header-btn" @click="screenfullToggle">
          <i class="el-icon-rank"></i>
        </span>

        <el-dropdown v-show="false">
          <span class="header-btn">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 10px;text-align: center;width: 420px">
              <div class="setting-category">
                <el-switch @change="saveSwitchTabBarVal" v-model="switchTabBar" active-text="开启TabBar" inactive-text="关闭TabBar">
                </el-switch>
                <el-switch @change="saveFixedTabBar" v-if="switchTabBar" v-model="fixedTabBar" style="margin-top: 10px" active-text="固定在顶部" inactive-text="随页面滚动">
                </el-switch>
                <el-alert v-if="switchTabBar" style="margin-top: 10px" title="导航标签超过容器时,可在导航上滚动鼠标来移动标签" type="info" show-icon>
                </el-alert>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <span class="header-btn" v-show="false">
          <el-badge :value="3" class="badge">
            <i class="el-icon-bell"></i>
          </el-badge>
        </span>

        <el-dropdown v-show="false">
          <span class="header-btn">
            {{uName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/personal')">
              <i style="padding-right: 8px" class="fa fa-cog"></i>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <i style="padding-right: 8px" class="fa fa-key"></i>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown v-show="false">
          <span class="header-btn">
            选择语言
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native='langChange("zh-cn")'>
              <i style="padding-right: 8px" class="fa fa-bandcamp"></i>中文</el-dropdown-item>
            <el-dropdown-item @click.native='langChange("en")'>
              <i style="padding-right: 8px" class="fa fa-eercast"></i>英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        -->

      </div>
    </div>
    <div class="app">
      <div class="aside">
        <div class="menu">
          <el-menu router background-color="#42475B" text-color="#fff" :default-active="$route.path" class="sidebarMenu" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="(menu_v) in sideMenu">
              <el-menu-item :index="menu_v.path" :key="menu_v.path">
                <i :class="menu_v.icon"></i>
                <span slot="title">{{ menu_v.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <div class="app-body">
        <NavBar id="nav-bar" :sideColor="sideColor" v-if="switchTabBar" :style="fixedTabBar && switchTabBar?'position: fixed;top: 0;':''"></NavBar>
        <div v-else style="margin-top: 50px;"></div>
        <div id="mainContainer" :style="fixedTabBar && switchTabBar?'margin-top: 88px;':''" class="main-container">
          <!--<transition name="fade">-->
          <keep-alive>
            <router-view offSetHeight='calc(100vh - 125px)' uiDomain="https://isearch.link"></router-view>
          </keep-alive>
          <!--</transition>-->
          <!-- 可以设置参数来判断哪些需要重新装载 哪些不需要
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
          -->
        </div>
        <EuiFooter v-show="false"></EuiFooter>
      </div>
    </div>
  </div>
</template>

<script>
import Screenfull from "screenfull";
import EuiFooter from "../layout/Footer.vue";
import NavBar from "../layout/NavBar.vue";
import Menu from "../../components/Menu/menu";
import { sidebarMenu } from "../../components/Menu/menu";

export default {
  data() {
    return {
      welcome: "今天是 " + gwTools.dateToString(new Date()) + ",",
      themeObj: {},
      fixedTabBar: false,
      switchTabBar: true,
      isCollapse: true
    };
  },

  computed: {
    sideMenu() {
      return sidebarMenu;
    },
    menu() {
      //必须使用computed来监听菜单更改

      //只监听Menu对象没有想过 必须使用srotre？？
      console.log("menuState" + this.$store.getters.menuState);

      return Menu;
    },
    routePath() {
      // console.log(this.$route.path);
      return this.$route.path == "/personal" ? "1" : this.$route.path;
      // return this.$route.path;
    },
    themeColor() {
      var color = this.$store.getters.themeColor;
      return "#373F42";
    },
    sideColor() {
      var defaultColor = this.$store.getters.themeColor;
      var newColor = this.$store.getters.themeColor;
      try {
        newColor = gwTools.getItemColors(newColor, 20);
      } catch (e) {}

      //设置按钮背景色
      var cssText =
        ".header-btn:hover {background-color:" +
        newColor +
        "; } .nav-bar .active {border: 1px solid " +
        defaultColor +
        "; background: " +
        defaultColor +
        ";}";

      var style = document.getElementById("app_portal_style");
      if (style == null) {
        style = document.createElement("style");
        style.id = "app_portal_style";
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        // console.log("再次设置");
        style.innerText = cssText;
      }

      // return newColor;
      return "#242E2F";
    },
    uName() {
      return this.$store.state.user.name;
    }
  },

  created() {},

  methods: {
    colorChange(color) {},
    activeChange(color) {},
    //更改语言
    langChange(lang) {
      i18n.locale = lang;
      gwI18n.eleLocale(lang);
      this.$store.dispatch("setLanguage", lang);
    },
    openPersonal() {
      // this.$alert(
      //   '<iframe src="http://localhost:8010/project/isearch/#/personal" style="  width: 100%;  height: 100%;  border: none;" frameborder="0"></iframe>',
      //   "个人信息",
      //   {
      //     dangerouslyUseHTMLString: true,
      //     customClass: "personalWin"
      //   }
      // );
      this.$router.push("/personal");
    },
    logout() {
      this.$confirm("即将退出系统, 是否继续?", i18n.t("gwssi.tips.tip"), {
        confirmButtonText: i18n.t("gwssi.tips.confirm"),
        cancelButtonText: i18n.t("gwssi.tips.cancel"),
        type: "warning"
      })
        .then(() => {
          //这里应该调用一下烽火台的退出地址 现在暂时是模拟退出的 只是删除token
          this.$store.dispatch("logOut", {}).then(
            json => {
              this.$store.dispatch("updateUserInfo", {
                user: "none",
                status: "0",
                id: "-1",
                name: "访客",
                roles: [],
                info: {}
              });

              this.$notify({
                title: "登出成功",
                message: "已退出统一管理平台",
                type: "success"
              });

              this.$router.push("/login");
            },
            error => {
              console.log("登出发生错误" + error);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    NavBarWidth() {
      let navBar = document.getElementById("nav-bar");
      if (!navBar) return;
      if (!(this.fixedTabBar && this.switchTabBar)) {
        navBar.style.width = "100%";
        return;
      }
      let sidebarClose = document.body.classList.contains("sidebar-close");
      if (sidebarClose) {
        navBar.style.width = "100%";
        return;
      }
      if (this.isCollapse) navBar.style.width = "calc(100% - 64px)";
      else navBar.style.width = "calc(100% - 230px)";
    },
    screenfullToggle() {
      if (!Screenfull.enabled) {
        this.$message({
          message: "你的浏览器不支持全屏！",
          type: "warning"
        });
        return false;
      }
      Screenfull.toggle();
    },
    saveFixedTabBar(v) {
      this.NavBarWidth();
    },
    saveSwitchTabBarVal(v) {
      let containerDom = document.getElementById("mainContainer");
      v
        ? (containerDom.style.minHeight = "calc(100vh - 152px)")
        : (containerDom.style.minHeight = "calc(100vh - 101px)");
      this.NavBarWidth();
    },
    sidebarToggle(e) {
      e.preventDefault();
      if (this.isCollapse) {
        document.body.classList.remove("sidebar-hidden");
        this.siteName = this.$Config.siteName;
        this.isCollapse = false;
      } else {
        document.body.classList.add("sidebar-hidden");
        this.isCollapse = true;
      }
      this.NavBarWidth();
    },
    hiddenSidebar(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-close");
      this.NavBarWidth();
    },
    handleOpen(key, keyPath) {
      // console.log("handleOpen" + key + keyPath);
    },
    handleClose(key, keyPath) {
      //关闭菜单
      // console.log("handleClose" + key + keyPath);
    }
  },
  mounted: function() {
    if (this.switchTabBar)
      document.getElementById("mainContainer").style.minHeight =
        "calc(100vh - 152px)";

    if (!this.isCollapse) {
      document.body.classList.remove("sidebar-hidden");
      this.siteName = this.$Config.siteName;
    } else {
      document.body.classList.add("sidebar-hidden");
    }

    setTimeout(() => {
      this.NavBarWidth();
    }, 1000);
  },
  components: {
    EuiFooter,
    NavBar
  }
};
</script>
<style lang="less">
@headerIconBorder: 1px solid #4c5154;
@headerIconShadow: 1px 0px 0px #202529;

.sidebar-hidden {
  .header {
    .logo {
      .big {
        display: none;
      }

      .min {
        display: block;
      }

      width: 150px;
    }
  }

  .aside {
    .sidebar-toggle {
      .icon-left {
        transform: rotate(180deg);
      }
    }
  }

  .main {
    .app-body {
      margin-left: 64px;
    }
  }
}

.sidebar-close {
  .header {
    .logo {
      width: 0;
      overflow: hidden;
    }
  }

  .aside {
    margin-left: -230px;
  }

  .main {
    .app-body {
      margin-left: 0;
    }
  }
}

.sidebar-hidden.sidebar-close {
  .aside {
    margin-left: -64px;
  }
}

.main {
  display: flex;

  .el-menu:not(.el-menu--collapse) {
    width: 230px;
  }

  .app {
    width: 100%;
    background-color: #ecf0f5;
  }

  .aside {
    position: fixed;
    margin-top: 50px;
    z-index: 10;
    background-color: #42475b;
    transition: all 0.3s ease-in-out;

    .menu {
      overflow-y: auto;
      // height: calc(~"100vh - 100px");
      height: calc(~"100vh");
    }

    .sidebar-toggle {
      position: relative;
      width: 100%;
      height: 50px;
      color: #fff;
      cursor: pointer;

      .icon-left {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 0;
        width: 64px;
        height: 100%;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .app-body {
    margin-left: 230px;
    -webkit-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
  }

  .main-container {
    //margin-top: 50px;
    padding: 6px;
  }
}

.header {
  width: 100%;
  position: fixed;
  display: flex;
  height: 50px;
  z-index: 10;

  .logo {
    .min {
      overflow: hidden;
      height: 50px;
      display: inline-block;
      border-right: @headerIconBorder;
      box-shadow: @headerIconShadow;
    }

    width: 230px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }

  .right {
    position: absolute;
    right: 0;
  }

  .header-btn {
    .el-badge__content {
      top: 14px;
      right: 7px;
      text-align: center;
      font-size: 9px;
      padding: 0 3px;
      background-color: #00a65a;
      color: #fff;
      border: none;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25em;
    }

    overflow: hidden;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    padding: 0 14px;
    color: #fff;
    /**
    &:hover {
      background-color: #367fa9;
    }
    **/
  }

  .header-btn2 {
    overflow: hidden;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    padding: 0 14px;
    color: #fff;
  }

  .welcome {
    overflow: hidden;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    padding: 0 14px;
    color: #fff;
    border-right: @headerIconBorder;
    box-shadow: @headerIconShadow;
  }

  .icon-btn {
    overflow: hidden;
    height: 50px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    padding: 0 14px;
    color: #fff;
    border-right: @headerIconBorder;
    box-shadow: @headerIconShadow;
    margin: 0px;
  }

  .icon-btn:hover {
    background-color: #212528;
  }
}

.menu {
  border-right: none;
}

.el-menu--vertical {
  min-width: 190px;
}

.setting-category {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

#isearchHorizontalMenu {
  margin-left: 2px;
  width: auto;
  height: 50px;
}

#isearchHorizontalMenu .el-menu-item,
#isearchHorizontalMenu .el-submenu {
  border-right: @headerIconBorder;
  box-shadow: @headerIconShadow;
  margin-left: 1px;
}

#isearchHorizontalMenu .el-menu-item:first-child {
  margin-left: 0px;
}

#isearchHorizontalMenu .el-menu-item,
#isearchHorizontalMenu .el-submenu,
#isearchHorizontalMenu .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
}

#isearchHorizontalMenu .el-submenu.is-active .el-submenu__title,
#isearchHorizontalMenu .el-menu-item.is-active {
  /**这部分颜色在组件中设置了字体颜色就不生效了**/
  border-bottom: solid 2px #212528;
}

.isearchHorizontalMenu .el-menu-item:hover {
  background-color: #212528;
}

.sidebarMenu {
  border-right: none;
}
</style>