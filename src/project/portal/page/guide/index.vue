<template>
  <div class="app-container">

    <el-alert style=" margin-top: 20px; margin-bottom: 20px;    " title="关于引导页" type="success" description=' 引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 https://github.com/kamranahmedse/driver.js .' show-icon>
    </el-alert>

    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">{{ $t('gwssi.portal.guide.button') }}</el-button>
  </div>
</template>

<script>
import * as Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import "./guide.css"; 
import steps from "./defineSteps";

export default {
  name: "Guide",
  data() {
    return {
      driver: null
    };
  },
  mounted() {
    this.driver = new Driver();
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }
};
</script>
