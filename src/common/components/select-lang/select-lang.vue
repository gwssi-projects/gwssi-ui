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
//需要首先注册全局对象 
// window.gwI18n = i18n;
// window.i18n = i18n.vueLocale;
//store对象
import store from "../../store"

export default {
  store,
  name: "gw-select-lang",
  methods: {
    langChange() {
      i18n.locale = this.lang;
      gwI18n.eleLocale(this.lang);
      this.$store.dispatch('setLanguage', this.lang);
    }
  },
  props: { test: "" },
  data() {
    return {
      lang: "",
      placeholder: i18n.t("gwssi.tips.lang"),
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
