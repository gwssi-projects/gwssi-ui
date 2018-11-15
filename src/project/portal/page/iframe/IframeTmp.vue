<template>
  <span v-show="false">{{url}}</span>
</template>

<script>
export default {
  props: {
    offSetHeight: {
      default: "calc(100vh - 175px)"
    },
    url: {
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function() {
    // console.log("mounted + url=" + this.url);
  },
  activated: function() {
    console.log("activated + url=" + this.url);
    //通知父页面URL更新
    if (this.url != null && this.url != "") {
      this.$emit("iframeChange", this.url);
    }
  },
  updated: function() {
    console.log("updated + url=" + this.url);
    //通知父页面URL更新
    if (
      this.url != null &&
      this.url != "" &&
      this.url != undefined &&
      this.url != "undefined"
    ) {
      this.$emit("iframeChange", this.url);
    }
  }
};
</script>
<style lang="less">
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>