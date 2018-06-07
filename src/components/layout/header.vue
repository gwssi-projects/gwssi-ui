<template>
  <!--布局#顶部组件-->
  <div class="gw-header">
    <div class="welcome">欢迎您:
      <span class="username">{{userName}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GWHeader",
    data(){
      return{
          userName:'admin'
      }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .welcome{
    margin-right: 20px;
    text-align: right;

    .username{
      font-weight: bold;
    }
  }

</style>
