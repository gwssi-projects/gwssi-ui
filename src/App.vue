<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
    /*background: url(assets/bg1.jpg) center !important;
    background-size: cover;*/
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>
