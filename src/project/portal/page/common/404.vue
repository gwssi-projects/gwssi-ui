<template>

  <el-card class="box-card">
    <div slot="header">
      <span>Page Not Found</span>
    </div>
    <el-row>
      <h1 class="error-code">404</h1>
      <p class="error-description">当前页面不存在或已经被删除</p>
      <div class="error-ctrl">
        <el-button size="mini" round @click="$router.push('/login')">主页</el-button>
        <el-button size="mini" round @click="$router.back()">返回</el-button>
      </div>
    </el-row>
  </el-card>

</template>

<script>
import "./css/400x500x.css";
</script>
