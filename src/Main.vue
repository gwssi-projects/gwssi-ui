
<template>
  <div id="Main">

    <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <div class="container">
        <h1>{{ $t('gwssi.title.gwssi') }}</h1>

        <select-lang>

        </select-lang>

      </div>
    </header>

    <main>

      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h1>简介</h1>
        </div>
        <p class="lead">基于 vue + elementUI 2.3.4（开发环境NodeJS版本 >= 6）构建，本实例项目包含以下部分，供开发人员参考并构建自己的项目：</p>
        <p>
          <a href="#">基础应用及组件库</a>
        </p>
        <p>
          <a href="#">西安军民融合大数据中心二期自建库项目</a>
        </p>
        <p>
          <a href="#">基于VUE的新版PORTAL架构</a>
        </p>
        <p>......</p>
      </div>

    </main>

  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      headerFixed: true
    };
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