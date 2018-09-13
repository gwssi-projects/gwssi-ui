<template>
  <div class="gridDemo ">

    <h1 class="title">Grid 用法实例<br>(grid只做数据获取和更新，具体的表单样式都是自定义的)</h1>

    <h3>基础grid(数据为mock模拟，主要测试前端功能和提交参数。)</h3>

    <gw-grid ref="tableDemo1" id="tableDemo1" class="tableDemo1" :action="action1" @updateGrid="updateGrid1">

      <el-form :inline="true" :model="formInline1" ref="formInline1" class="demo-form-inline">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formInline1.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-select v-model="formInline1.address" placeholder="地址">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query1">查询</el-button>
          <el-button @click="resetForm('formInline1')">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate1(scope.row.name, formInline1.name)"></span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showDate1(scope.row.address, formInline1.address)"></span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="elPaginationDemo" :current-page="formInline1.currentPage" :page-size="formInline1.pageSize1" @current-change="handleCurrentChange1" @size-change="handleSizeChange1" :page-sizes="pageSizes1" :layout="layout1" :total="total1">
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
      this.formInline1.currentPage = 1;
      this.formInline1.pageSize = val;
      this.$refs.tableDemo1.query(this.formInline1);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.formInline1.currentPage = val;
      this.$refs.tableDemo1.query(this.formInline1);
    },
    query1() {
      //获取数据
      this.formInline1.currentPage = 1;
      this.$refs.tableDemo1.query(this.formInline1);
    },
    updateGrid1(data, total) {
      this.tableData1 = data;
      this.total1 = total;
      //移动到顶部
      document.getElementById("tableDemo1").scrollIntoView(true);
      return false;
    },
    // 高亮
    showDate1(val, rep) {
      val = val + "";
      if (val.indexOf(rep) !== -1 && rep !== "") {
        return val.replace(rep, '<font color="#f77373">' + rep + "</font>");
      } else {
        return val;
      }
    },
    ///////

    resetForm(formName) {
      //elementUI重置表单的条件
      // 1.表单要写上ref="form"来自哪个 表单的数据
      // 2.需要重置的选项必须加上prop="name"的指向
      this.$refs[formName].resetFields();
    }
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
        //每页显示条数
        pageSize: 10,
        //当前页数
        currentPage: 1
      },
      //每页显示个数选择器的选项设置
      pageSizes1: [10, 50, 100, 150, 200],
      layout1: "total, sizes, prev, pager, next, jumper",
      total1: 0,
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
