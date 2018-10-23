<template>
  <el-card :body-style="{ padding: '10px', height : 'calc(100vh - 175px)'}">
    <iframe name="8f40f10bc0a80166284fae042680a96b" id="8f40f10bc0a80166284fae042680a96b" :src="uiDomain + url" frameborder="0"></iframe>
  </el-card>
</template>

<script>
export default {
  computed: {
    url() {
      return decodeURIComponent(this.$route.params.url);
    }
  },
  data() {
    return {
      uiDomain: "https://isearch.link"
      // url: this.$route.params.url
    };
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