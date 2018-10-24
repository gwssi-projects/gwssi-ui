<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>自定义IconFont图标</span>
        <a href="http://www.iconfont.cn/" target="_blank" style="float: right; padding: 3px 0;font-size: 12px;" type="text">More
          <i class="el-icon-d-arrow-right"></i>
        </a>
      </div>
      <el-row :gutter="20" class="font-awesome">
        <el-col :span="4" v-for="(v,i) in icon" :key="i">
          <i :class="'iconfont '+v"></i><br />{{ v }}
        </el-col>

      </el-row>

      <el-alert style=" margin-top : 20px;" title="使用说明" type="success" description="通过iconfont来自定义需要的字体图标（http://www.iconfont.cn/），搜索确定需要的图片后，加入购物车，之后在购物车页面加入项目，在图标管理-》我的项目页面选择font class后下载到本地，引入CSS后即可使用。" show-icon>
      </el-alert>

    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>彩色图标</span>
        <a href="http://www.iconfont.cn/" target="_blank" style="float: right; padding: 3px 0;font-size: 12px;" type="text">More
          <i class="el-icon-d-arrow-right"></i>
        </a>
      </div>
      <el-row :gutter="20" class="font-awesome">
        <el-col :span="4" v-for="(v,i) in icon1" :key="i">
          <svg class="iconfont2" aria-hidden="true">
            <use :xlink:href="'#' + v"></use>
          </svg>
          <br />{{ v }}
        </el-col>

      </el-row>

      <el-alert style=" margin-top : 20px;" title="使用说明" type="success" description="彩色图标需要引入iconfont.js，使用svg标签，通过class控制图标大小。" show-icon>
      </el-alert>

    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: [
        "icon-git",
        "icon-shenfenzheng",
        "icon-wodedamaijihuo",
        "icon-damailogo",
        "icon-github",
        "icon-wechat",
        "icon-Computer-",
        "icon-xinyongqia-",
        "icon-yonghu-",
        "icon-icon_shezhi_m",
        "icon-icon_shizhong_m",
        "icon-icon_wode_mian",
        "icon-icon_wenben_mian",
        "icon-edit_code"
      ],
      icon1: [
        "icon-link",
        "icon-mind_map",
        "icon-org_unit",
        "icon-serial_tasks",
        "icon-voicemail",
        "icon-workflow",
        "icon-Computer-",
        "icon-xinyongqia-",
        "icon-yonghu-"
      ]
    };
  },
  methods: {},
  mounted: function() {}
};
</script>
<style lang="less">
.box-card {
  border-radius: 0;
}

.font-awesome .el-col {
  margin: 20px 0;
  text-align: center;
}

.iconfont2 {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1.5em;
  height: 1.5em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
             normalize.css 中也包含这行 */
  overflow: hidden;
  margin-right: 10px;
}
</style>