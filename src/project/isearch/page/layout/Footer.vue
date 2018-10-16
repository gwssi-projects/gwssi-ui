<template>
  <div class="footer" style="  position: ab ; ">
    <div class="version">
      <b>Version 1.5</b><img src="../home/images/logo.png" style="padding: 0px; margin:0px; position: relative; right: 0px; top: 10px;" />
    </div>
    <img style="padding: 0px; margin:0px; position: relative; left: 0px; top: 10px;" src="../home/images/gwssi_logo.jpg" />版权所有
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