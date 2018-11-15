<template>
  <el-card :body-style="{ padding: '10px', height : offSetHeight}">
    <el-tabs v-model="editableTab" class="iframe-el-tab">
      <el-tab-pane v-for="(item, index) in iframeSelectTab" :disabled='disabled' :key="item.path" :label="item.path" :name="item.path">
        <iframe :index="index" :src="item.url" frameborder="0"></iframe>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "iframe-tabs",
  props: {
    offSetHeight: {
      default: "calc(100vh - 175px)"
    }
  },
  computed: {
    url() {
      return decodeURIComponent(this.$route.params.url);
    }
  },
  data() {
    return {
      editableTab: "",
      disabled: false,
      iframeSelectTab: []
    };
  },
  methods: {
    removeTab(_url) {
      var name = md5(_url);

      for (var i = 0; i < this.iframeSelectTab.length; i++) {
        if (this.iframeSelectTab[i].path == name) {
          this.iframeSelectTab.splice(i, 1);
          return;
        }
      }
    },
    addTab(_url) {
      var name = md5(_url);

      var add = false;

      for (var i = 0; i < this.iframeSelectTab.length; i++) {
        if (this.iframeSelectTab[i].path == name) {
          add = true;
          break;
        }
      }

      if (!add) {
        this.iframeSelectTab.push({
          path: name,
          url: _url
        });
      }

      this.editableTab = name;
    }
  },
  mounted: function() {}
};
</script>
<style lang="less">
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.iframe-el-tab,
.iframe-el-tab .el-tabs__content,
.iframe-el-tab .el-tabs__content .el-tab-pane {
  width: 100%;
  height: 100%;
}
.iframe-el-tab .el-tabs__header {
  display: none;
}
</style>