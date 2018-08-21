
<template>

  <div id="main">
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <div class="container">
        <h3>{{ $t('gwssi.title.gwssi') }} : {{ $t('gwssi.tips.login') }}</h3>
        <gw-select-lang></gw-select-lang>
      </div>
    </header>

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

header h3 {
  width: 380px;
  font-size: 16px;
  font-weight: normal;
  padding: 15px;
  color: #666;
  font-style: italic;
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
</style>