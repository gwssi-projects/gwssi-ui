<template>
  <div id="Main">

    <header class="header" :class="{ 'header-fixed' : headerFixed }">

    </header>



<!--

    <el-container>
      <el-header>{{ $t('gwssi.title.gwssi') }}</el-header>
      <el-main>中英文切换按钮  标题的国际化</el-main>
      <el-button>{{ $t('el.colorpicker.confirm') }}</el-button>

      <el-select v-model="lang" placeholder="请选择语言">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
      </el-select>
    </el-container>
    -->
  </div>
</template>

<script>
export default {
  methods: {},

  // 在组件的template中，调用$t()方法
  // 在组件的script中，调用this.$i18n.t()方法，或者 this.$t

  // let locale = this.$i18n.locale
  // locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'

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
      ],
      value: ""
    };
  }
};
</script>

<style  lang="less" scoped>
@baseBC: rgb(248, 248, 248);
@baseTextColor: rgb(51, 51, 51);

header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: @baseBC;
  color: @baseTextColor;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>