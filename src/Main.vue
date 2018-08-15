<template>
  <div id="Main">
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

      lang :"",
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

.el-header {
  background-color: @baseBC;
  color: @baseTextColor;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>