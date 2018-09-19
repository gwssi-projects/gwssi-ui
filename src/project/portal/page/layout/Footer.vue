<template>
  <div class="footer">
    <div class="version">

      <b>Version</b> {{ $Config.version }}

      <a href="https://github.com/gwssi-projects/gwssi-ui/tree/1.x" target="_blank">
        <i class="iconfont icon-github"></i>
      </a>
    </div>
    <strong>Copyright © 2018-2019 .</strong>All rights reserved.
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>


<style lang="less">
a {
  color: #444;
}

.footer {
  background: #fff;
  line-height: 50px;
  padding: 0 20px 0 20px;
  height: 50px;
  color: #444;
  border-top: 1px solid #d2d6de;

  .version {
    float: right;

    b {
      font-weight: 700;
    }

    .github {
      color: #444;
      font-size: 20px;
      margin-left: 8px;

      &:hover {
        color: #8bc34a;
      }
    }
  }
}
</style>