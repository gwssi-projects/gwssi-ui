<template>
  <div id="select-lang">

    <el-select v-model="lang" placeholder="请选择语言">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>

  </div>

</template>

<script>
// 在组件的template中，调用$t()方法
// 在组件的script中，调用this.$i18n.t()方法，或者 this.$t

// let locale = this.$i18n.locale
// locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
export default {
  name: "select-lang",
  methods: {},
  props: {},
  data() {
    return {
      lang: "",
      options: [
        {
          value: "zh",
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
