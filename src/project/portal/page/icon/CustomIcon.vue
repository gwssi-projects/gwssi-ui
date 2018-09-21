<template>
  <div>
    <el-card class="box-card" v-for="(icons,title) in CustomIcon" :key="title">
      <div slot="header">
        <span>{{ title }}</span>
        <a href="http://www.iconfont.cn/" target="_blank" style="float: right; padding: 3px 0;font-size: 12px;" type="text">More
          <i class="el-icon-d-arrow-right"></i>
        </a>
      </div>
      <el-row :gutter="20" class="font-awesome">
        <el-col :span="4" v-for="(v,i) in icons" :key="i">
          <i :class="'iconfont '+v"></i><br/>{{ v }}
        </el-col>

      </el-row>

      <el-alert style=" margin-top : 20px;" title="使用说明" type="success" description="通过iconfont来自定义需要的字体图标（http://www.iconfont.cn/），搜索确定需要的图片后，加入购物车，之后在购物车页面加入项目，在图标管理-》我的项目页面选择font class后下载到本地，引入CSS后即可使用。" show-icon>
      </el-alert>

    </el-card>
  </div>
</template>

<script>
import CustomIcon from "./CustomIcon";

export default {
  data() {
    return {
      CustomIcon: CustomIcon
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
</style>