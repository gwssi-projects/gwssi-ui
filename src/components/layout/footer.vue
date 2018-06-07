<template>
  <!--布局#页脚组件-->
  <div class="gw-footer">
      版权所有 &copy {{name}}
  </div>
</template>

<script>
export default {
  name: "GWFooter",
    data() {
        return {
           name:'长城软件'
        }
    },
};
</script>
