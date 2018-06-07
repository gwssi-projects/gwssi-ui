<template>

    <transition name="el-fade-in-linear" mode="out-in" appear>
      <router-view></router-view>
    </transition>

</template>

<script>
export default {
  name: "GWMain",
    mounted:function () {
      //默认跳转到关于页面
        this.$router.push('/about')
    }
};
</script>

