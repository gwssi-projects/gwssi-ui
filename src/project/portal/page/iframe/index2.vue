<template>
  <el-card :body-style="{ padding: '10px', height : offSetHeight}">
    <iframe name="8f40f10bc0a80166284fae042680a96b" id="8f40f10bc0a80166284fae042680a96b" :src="uiDomain + url" frameborder="0"></iframe>
  </el-card>
</template>

<script>
export default {
  props: {
    offSetHeight: {
      default: "calc(100vh - 175px)"
    },
    uiDomain: {
      default: ""
    }
  },
  computed: {
    url() {
      return decodeURIComponent(this.$route.params.url);
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function() {}
};
</script>
<style lang="less">
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>