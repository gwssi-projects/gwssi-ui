
<template>
  <div id="main">

    <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <div class="container">
        <h1>{{ $t('gwssi.title.gwssi') }}</h1>
        <gw-select-lang></gw-select-lang>
      </div>
    </header>

    <main>
      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h1>{{ $t('gwssi.introduction.introduction') }}</h1>
        </div>
        <p class="lead">{{ $t('gwssi.introduction.info') }}</p>
        <p>
          <a href="#">{{ $t('gwssi.introduction.base') }}</a>
        </p>
        <p>
          <a href="#">{{ $t('gwssi.introduction.iptrm') }}</a>
        </p>
        <p>
          <a href="#">{{ $t('gwssi.introduction.protal') }}</a>
        </p>
        <p>......</p>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  mounted : function () {
    console.log(i18n.t('gwssi.title.gwssi'));
  },
  methods: {},
  data() {
    return {
      headerFixed: true
    };
  },
  metaInfo: {
    //标题国际化
    title: i18n.t('gwssi.title.gwssi')
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

header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: @baseBC;
  color: @baseTextColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

header h1 {
  width: 380px;
  font-size: 20px;
  padding: 15px;
  float: left;
}

header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

div.container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

#select-lang {
  margin-top: 20px;
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

main .page-header {
  padding-bottom: 9px;
  margin: 40px 0 20px;
  border-bottom: 1px solid #eee;
}
</style>