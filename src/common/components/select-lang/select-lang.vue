<template>
  <div id="select-lang">

    <el-select v-model="lang" :placeholder="$t('gwssi.tips.lang')" @change="langChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>

  </div>

</template>

<script>
import Vue from 'vue'

// 使用方法
// 在组件的template中，调用$t()方法
// 在组件的script中，调用this.$i18n.t()方法，或者 this.$t
export default {
  name: "gw-select-lang",
  methods: {
    langChange() {
      //this.$i18n.locale  = (this.lang);
      Vue.config.lang = (this.lang);
    }
  },
  props: { test: "" },
  data() {
    return {
      lang: "",
      options: [
        {
          value: "zh-cn",
          label: "中文"
        },
        {
          value: "en",
          label: "英文"
        }
      ]
    };
  }
};
</script>

<style lang="less">
/**
@import './lang.less'; **/
</style>
