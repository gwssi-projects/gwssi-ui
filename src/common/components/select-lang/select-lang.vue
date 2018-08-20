<template>
  <div id="select-lang">

    <el-select v-model="lang" :placeholder="placeholder" @change="langChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </el-option>
    </el-select>

  </div>

</template>

<script>

export default {
  name: "gw-select-lang",
  methods: {
    langChange() {
      i18n.locale = this.lang;
    }
  },
  props: { test: "", placeholder: i18n.t("gwssi.tips.lang") },
  data() {
    return {
      lang: "",
      options: [
        {
          value: "zh-cn",
          label: i18n.t("gwssi.tips.zh")
        },
        {
          value: "en",
          label: i18n.t("gwssi.tips.en")
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
