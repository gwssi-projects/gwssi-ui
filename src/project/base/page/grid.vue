<template>
  <div class="gridDemo ">

    <h1 class="title">Grid 用法实例<br>(grid只做数据获取和更新，具体的表单样式都是自定义的，更多的elementUI表格用法参考官方网站。)</h1>
    <!---第一个样例-->
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

      <el-pagination class="elPaginationDemo" :current-page="formInline1.currentPage" :page-size="formInline1.pageSize" @current-change="handleCurrentChange1" @size-change="handleSizeChange1" :page-sizes="pageSizes1" :layout="layout1" :total="total1">
      </el-pagination>

    </gw-grid>

    <!---第二个样例-->
    <h3>锁定列</h3>

    <el-form :inline="true" :model="formInline2" ref="formInline2" class="demo-form-inline">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInline2.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-select v-model="formInline2.address" placeholder="地址">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query2">查询</el-button>
        <el-button @click="resetForm('formInline2')">清空</el-button>
      </el-form-item>
    </el-form>

    <gw-grid ref="tableDemo2" id="tableDemo2" class="tableDemo2" :action="action2" @updateGrid="updateGrid2">
      <el-table :data="tableData2" style="width: 100%" max-height="360">
        <el-table-column fixed type="index" :index="indexMethod2" width="50">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow2(scope.$index, tableData2)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination class="elPaginationDemo" :current-page="formInline2.currentPage" :page-size="formInline2.pageSize" @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :page-sizes="pageSizes2" :layout="layout2" :total="total2">
      </el-pagination>
    </gw-grid>

    <!---第三个样例-->
    <h3>排序，自定义按钮</h3>
    <el-form :inline="true" :model="formInline3" ref="formInline3" class="demo-form-inline">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInline3.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-select v-model="formInline3.address" placeholder="地址">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query3">查询</el-button>
        <el-button @click="resetForm('formInline3')">清空</el-button>
      </el-form-item>
    </el-form>

    <gw-grid ref="tableDemo3" id="tableDemo3" class="tableDemo3" :action="action3" @updateGrid="updateGrid3">
      <el-table :data="tableData3" border show-summary style="width: 100%" @sort-change='sortChange3'>
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="amount1" width="100" sortable label="数值 1">
        </el-table-column>
        <el-table-column prop="amount2" width="100" sortable label="数值 3">
        </el-table-column>
        <el-table-column prop="amount3" width="100" sortable label="数值 3">
        </el-table-column>
      </el-table>

      <el-pagination class="elPaginationDemo" :current-page="formInline3.currentPage" :page-size="formInline3.pageSize" @current-change="handleCurrentChange3" @size-change="handleSizeChange3" :page-sizes="pageSizes3" :layout="layout3" :total="total3">
      </el-pagination>
    </gw-grid>

    <!---第四个样例-->
    <h3>自定义循环体</h3>

    <el-form :inline="true" :model="formInline4" ref="formInline4" class="demo-form-inline">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInline4.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-select v-model="formInline4.address" placeholder="地址">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query4">查询</el-button>
        <el-button @click="resetForm('formInline4')">清空</el-button>
      </el-form-item>
    </el-form>

    <gw-grid ref="tableDemo4" id="tableDemo4" class="tableDemo4" :action="action4" @updateGrid="updateGrid4">
      <ul>
        <li v-for="data in tableData4" :key="data.id">{{ data.name }} ":" {{ data.address }} <img :src="data.image" /></li>
      </ul>

      <el-pagination class="elPaginationDemo" :current-page="formInline4.currentPage" :page-size="formInline4.pageSize" @current-change="handleCurrentChange4" @size-change="handleSizeChange4" :page-sizes="pageSizes4" :layout="layout4" :total="total4">
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

    //第二个grid
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.formInline2.currentPage = 1;
      this.formInline2.pageSize = val;
      this.$refs.tableDemo2.query(this.formInline2);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.formInline2.currentPage = val;
      this.$refs.tableDemo2.query(this.formInline2);
    },
    query2() {
      //获取数据
      this.formInline2.currentPage = 1;
      this.$refs.tableDemo2.query(this.formInline2);
    },
    updateGrid2(data, total) {
      this.tableData2 = data;
      this.total2 = total;
      //移动到顶部
      document.getElementById("tableDemo2").scrollIntoView(true);
      return false;
    },
    indexMethod2(index) {
      return (
        index +
        1 +
        this.formInline2.pageSize * (this.formInline2.currentPage - 1)
      );
    },
    deleteRow2(index, rows) {
      rows.splice(index, 1);
    },
    ///////

    //第三个grid
    handleSizeChange3(val) {
      console.log(`每页 ${val} 条`);
      this.formInline3.currentPage = 1;
      this.formInline3.pageSize = val;
      this.$refs.tableDemo3.query(this.formInline3);
    },
    handleCurrentChange3(val) {
      console.log(`当前页: ${val}`);
      this.formInline3.currentPage = val;
      this.$refs.tableDemo3.query(this.formInline3);
    },
    query3() {
      //获取数据
      this.formInline3.currentPage = 1;
      this.$refs.tableDemo3.query(this.formInline3);
    },
    updateGrid3(data, total) {
      this.tableData3 = data;
      this.total3 = total;
      //移动到顶部
      document.getElementById("tableDemo3").scrollIntoView(true);
      return false;
    },
    sortChange3(short) {
      console.log(
        "short = " + short.column + "|" + short.prop + "|" + short.order
      );
      this.formInline3.currentPage = 1;
      this.formInline3.short = short.prop + " " + short.order;
      this.$refs.tableDemo3.query(this.formInline3);
    },
    ///////

    //第四个grid
    handleSizeChange4(val) {
      console.log(`每页 ${val} 条`);
      this.formInline4.currentPage = 1;
      this.formInline4.pageSize = val;
      this.$refs.tableDemo4.query(this.formInline4);
    },
    handleCurrentChange4(val) {
      console.log(`当前页: ${val}`);
      this.formInline4.currentPage = val;
      this.$refs.tableDemo4.query(this.formInline4);
    },
    query4() {
      //获取数据
      this.formInline4.currentPage = 1;
      this.$refs.tableDemo4.query(this.formInline4);
    },
    updateGrid4(data, total) {
      this.tableData4 = data;
      this.total4 = total;
      //移动到顶部
      document.getElementById("tableDemo4").scrollIntoView(true);
      return false;
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
    this.query2();
    this.query3();
    this.query4();
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
      tableData1: [],
      ////////////

      //第二个grid
      action2: apiUrl.gwssi.grid.list.url,
      formInline2: {
        name: "",
        address: "",
        pageSize: 10,
        currentPage: 1
      },
      pageSizes2: [10, 50, 100, 150, 200],
      layout2: "total, sizes, prev, pager, next, jumper",
      total2: 0,
      tableData2: [],
      ////////////

      //第三个grid
      action3: apiUrl.gwssi.grid.list.url,
      formInline3: {
        name: "",
        address: "",
        pageSize: 10,
        currentPage: 1,
        short: ""
      },
      pageSizes3: [10, 50, 100, 150, 200],
      layout3: "total, sizes, prev, pager, next, jumper",
      total3: 0,
      tableData3: [],
      ////////////

      //第四个grid
      action4: apiUrl.gwssi.grid.list.url,
      formInline4: {
        name: "",
        address: "",
        pageSize: 10,
        currentPage: 1,
        short: ""
      },
      pageSizes4: [10, 50, 100, 150, 200],
      layout4: "total, sizes, prev, pager, next, jumper",
      total4: 0,
      tableData4: []
      ////////////
    };
  }
};
</script>
<style>
.gridDemo {
  position: relative;
  width: 1024px;
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
.gridDemo h3 {
  margin-top: 20px;
}
</style>
