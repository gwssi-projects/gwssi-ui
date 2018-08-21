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
//需要首先注册全局对象 window.i18n = i18n;
import tools from "../tools";

export default {
  name: "gw-select-lang",
  methods: {
    langChange() {
      i18n.locale = this.lang;
      tools.setCookie("content-Language", this.lang, 10);
    }
  },
  //mounted不能国际化下述data中的内容，生命周期顺序加载的问题
  //mounted: function() {
  beforeCreate: function() {
    //这部分可以通过浏览器来选择默认语言(第一次语言设置在初始化window.i18n的代码中进行)，这里首先通过参数和cookie判断语言
    var lang = tools.getQueryString("language");
    if (lang == null) {
      lang = tools.getCookie("content-Language");
    }

    console.log("language = " + lang);
    console.log("i18n.locale = " + i18n.locale);
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
