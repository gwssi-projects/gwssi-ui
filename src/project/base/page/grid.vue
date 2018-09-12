<template>
  <div class="gridDemo ">

    <h1 class="title">Grid 用法实例<br>(grid只做数据获取和更新，具体的表单样式都是自定义的)</h1>

    <h3>基础grid</h3>

    <gw-grid ref="tableDemo1" id="tableDemo1" class="tableDemo1" :action="action1" @updateGrid="updateGrid1">

      <el-form :inline="true" :model="formInline1" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline1.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-select v-model="formInline1.address" placeholder="地址">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query1">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>

      <el-pagination class="elPaginationDemo" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="pageSizes1" :page-size="pageSize1" :layout="layout1" :total="total1">
      </el-pagination>

    </gw-grid>

  </div>
</template>

  <script>
import GwGrid from "@components/grid";
import Vue from "vue";
import apiUrl from "@/common/api";

Vue.use(GwGrid);

export default {
  name: "gridDemo",

  methods: {
    //第一个grid
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
    },
    query1() {
      console.log("query1");
      this.$refs.tableDemo1.query();
    },
    updateGrid1(data) {
      this.tableData1 = data;
    }
    ///////
  },

  mounted() {
    //创建之后直接获取数据
    this.query1();
  },

  data() {
    return {
      //第一个grid
      action1: apiUrl.gwssi.grid.list.url,
      formInline1: {
        name: "",
        address: "",
        pageSize: this.pageSize1,
        currentPage: this.currentPage1
      },
      currentPage1: 5,
      pageSize1: 200,
      pageSizes1: [100, 200, 300, 400],
      layout1: "total, sizes, prev, pager, next, jumper",
      total1: 400,
      tableData1: []
      ////////////
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
.elPaginationDemo {
  margin-top: 10px;
  text-align: right;
}
</style>
