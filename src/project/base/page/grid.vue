<template>
  <div class="gridDemo ">

    <h1 class="title">Grid 用法实例</h1>

    <gw-grid>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </gw-grid>

  </div>
</template>

  <script>
import GwGrid from "@components/grid";
import Vue from "vue";

Vue.use(GwGrid);

export default {
  name: "gridDemo",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
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
