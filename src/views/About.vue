<template>
  <div class="about">
    <h1>欢迎进入大数据管理平台</h1>
    <h4>我们使用的技术如下：</h4>
    <el-table
            :data="tableData2"
            style="width: 100%"
            :row-class-name="tableRowClassName">
      <el-table-column
              prop="date"
              label="使用技术"
              >
      </el-table-column>
      <el-table-column
              prop="name"
              label="版本"
              >
      </el-table-column>
      <el-table-column
              label="链接">
        <template slot-scope="scope">
         <a :href="scope.row.address">{{scope.row.address}}</a>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
    export default {
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data() {
            return {
                tableData2: [{
                    date: 'Vue',
                    name: '2.5.16',
                    address: 'https://cn.vuejs.org/',
                }, {
                    date: 'Vue-Router',
                    name: '3.0.1',
                    address: 'https://router.vuejs.org/zh/'
                }, {
                    date: 'ElementUI',
                    name: '2.4.0',
                    address: 'http://element-cn.eleme.io/#/zh-CN/',
                },{
                    date: '...',
                    name: '...',
                    address: '',
                }]
            }
        }
    }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
