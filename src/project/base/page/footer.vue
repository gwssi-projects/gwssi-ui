<template>

  <div class="app-footer">
    <i class="el-icon-share"></i>&nbsp;
    <span class="footer-text">更多基础组件：弹窗、按钮、导航...请参考官方网站：
      <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank">http://element-cn.eleme.io/#/zh-CN</a>
    </span>
    &nbsp;
    <i class="iconfont icon-wechat"></i>&nbsp;微信：gwssi@com.cn
  </div>

</template>

<script>
export default {
  name: "app-footer",
  beforeMount: function() {},

  props: {
    //项目中的默认颜色
    defaultColor: String,
    obj: Object
  },

  mounted: function() {},

  methods: {},
  data() {
    return {};
  }
};
</script>

<style  lang="less" scoped>
.app-footer {
  text-align: center;
  color: #909db7;
  padding-top: 20px;
}
</style>