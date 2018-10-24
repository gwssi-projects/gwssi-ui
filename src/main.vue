
<template>

  <div class="container">
    <h1><a href="project/base/#login" target="_blank">{{ $t('gwssi.introduction.base') }}</a></h1>
    <h1><a href="project/portal/#/login" target="_blank">{{ $t('gwssi.introduction.protal') }}</a></h1>
    <h1><a href="project/isearch/#/login" target="_blank">isearch</a></h1>
    <p>......</p>

    <el-alert class="el-alert" :title="$t('gwssi.introduction.info')" type="info" center show-icon></el-alert>
    <el-alert class="el-alert" title="注意：如果访问了isearch，自定义颜色会被自动切换回浅蓝色。" center type="warning" show-icon></el-alert>
    <gw-select-lang size="mini" style="position: absolute;  right: 30px;  top: 20px;"></gw-select-lang>
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
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);

div.container {
  width: 1024px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
h1 {
  font-size: 39px;
}
h1 a {
  color: #333333;
}
.el-alert {
  margin: 10px 0 10px;
}
</style>