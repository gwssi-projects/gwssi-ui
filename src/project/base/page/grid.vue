<template>
  <div class="gridDemo ">

    <h1 class="title">Grid 用法实例</h1>

    <gw-grid></gw-grid>

  </div>
</template>

  <script>
import GwGrid from "@components/grid";
import Vue from "vue";

Vue.use(GwGrid);

export default {
  name: "gridDemo"
};
</script>
<style>
.gridDemo {
  position: relative;
  width: 888px;
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-family: Roboto, Segoe UI, "Microsoft YaHei";
}

.gridDemo .title {
  font-size: 2rem;
  font-weight: 30;
  text-align: center;
  margin: 0;
}
</style>
