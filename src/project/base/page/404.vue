<template>
  <div class="error-panel animated fadeInUp">
    <h1 class="error-code">404</h1>
    <p class="error-description">Page Not Found</p>
    <div class="error-ctrl">
      <el-button size="mini" round @click="$router.push('/login')">主页</el-button>
      <el-button size="mini" round @click="$router.back()">返回</el-button>
    </div>
  </div>
</template>

<script>
import "./css/400x500x.css";
</script>
