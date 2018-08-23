<template>
  <el-color-picker v-model="color" @active-change="activeChange" @change="colorChange"></el-color-picker>
</template>

<script>
export default {
  name: "gw-color-picker",
  methods: {
    colorChange: function() {
      //触发颜色更新事件 返回给父页面
      this.$emit("colorChange", this.color);
    },
    activeChange: function() {
      //触发颜色更新事件 返回给父页面
      this.$emit("activeChange", this.color);
    }
  },
  mounted: function() {
    console.info("theme color = " + this.color);
  },
  beforeCreate: function() {},

  props: {
    defaultColor: String,
    obj: Object
  },

  data() {
    return {
      color: this.defaultColor
    };
  }
};
</script>

<style lang="less">
/**
@import './lang.less'; **/
</style>
