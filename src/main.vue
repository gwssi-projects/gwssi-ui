
<template>
  <div id="main">

    <div class="header">
      <div class="topbar">
        <span>
          <svg class="iconfont" aria-hidden="true">
            <use xlink:href="#icon-mind_map"></use>
          </svg>
          {{ $t('gwssi.title.gwssi') }}</span>
        <gw-select-lang size="mini" style="position: absolute;  right: 0px;  top: 10px;"></gw-select-lang>
      </div>
    </div>

    <div class="container">

      <el-tag type="info" color="#fff"><a href="project/base/#login" target="_blank">{{ $t('gwssi.introduction.base') }}</a></el-tag>
      <el-tag type="info" color="#fff"><a href="project/portal/#/login" target="_blank">{{ $t('gwssi.introduction.protal') }}</a></el-tag>
      <el-tag type="info" color="#fff"><a href="project/isearch/#/login" target="_blank">ISEARCH</a></el-tag>

      <p>......</p>

      <el-alert class="el-alert" :title="$t('gwssi.introduction.info')" type="info" center show-icon></el-alert>
      <el-alert class="el-alert" :title="$t('gwssi.introduction.warning')" center type="warning" show-icon></el-alert>
      <el-alert class="el-alert" :title="$t('gwssi.introduction.github')" center type="success" show-icon></el-alert>

    </div>
  </div>

</template>

<script>
export default {
  mounted: function() {
    console.log(i18n.t("gwssi.title.gwssi"));
  },
  methods: {},
  data() {
    return {
      headerFixed: true
    };
  },
  metaInfo: {
    //标题国际化
    title: i18n.t("gwssi.title.gwssi")
    //标题模版
    //titleTemplate: "%s - by vue-meta",
    //html标签中 增加 <html data-vue-meta="lang" lang="zh">
    // htmlAttrs: {   lang: "zh"    },
    //增加script标签
    // script: [
    //   { innerHTML: 'console.log("hello hello!")', type: "text/javascript" }
    // ],
    // __dangerouslyDisableSanitizers: ["script"]
  }
};
</script>

<style  lang="less" scoped>
div.header {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px #ccc solid;
}
div.topbar {
  position: relative;
  width: 1024px;
  margin: 0 auto;
}
div.topbar span {
  position: absolute;
  left: 0px;
  top: 10px;
  font-size: 16px;
  color: #666;
}
div.container {
  position: relative;
  width: 1024px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
}
a {
  color: #909399;
}
a:hover {
  color: #333;
  text-decoration: none;
}
.el-alert {
  margin: 10px 0 15px;
}
.el-tag {
  margin: 10px;
  font-size: 18px;
}

.iconfont {
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