<template>
    <div class="activePublic ">
        <el-steps :space="200" :active="step" class="step">
            <el-step title="活动信息" description=""></el-step>
            <el-step title="报名签到" description=""></el-step>
            <el-step title="分享设置" description=""></el-step>
            <el-step title="个性设置" description=""></el-step>
        </el-steps>

        <transition name="fade">
            <router-view class="view"></router-view>
        </transition>

        <div class="but-group">
            <el-button @click.native.prevent="handlePreview" v-show="preview">预览</el-button>
            <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
            <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
            <el-button @click.native.prevent="handlePublish" v-show="publish" type="primary">发布活动</el-button>
        </div>
    </div>
</template>

  <script>
export default {
  name: "activePublic",
  data: function() {
    return {
      preview: false,
      preStep: false,
      nextStep: false,
      publish: false,
      step: 1
    };
  },
  methods: {
    handlePreview: function() {
      console.log("预览");
    },
    handlePreStep: function() {
      this.$router.push("/form/step" + (this.step - 1));
      this.step--;
      this.goStep(this.step);
      window.scroll(0, 0);
    },
    handleNextStep: function() {
      this.$router.push("/form/step" + (this.step + 1));
      this.step++;
      this.goStep(this.step);
      window.scroll(0, 0);
    },
    handlePublish: function() {
      console.log("发布");
    },
    goStep: function(n) {
      switch (n) {
        case 1:
          this.preview = false;
          this.preStep = false;
          this.nextStep = true;
          this.publish = false;
          break;
        case 2 | 3:
          this.preview = false;
          this.preStep = true;
          this.nextStep = true;
          this.publish = false;
          break;
        case 4:
          this.preview = true;
          this.preStep = true;
          this.nextStep = false;
          this.publish = true;
          break;
      }
    }
  },
  beforeCreated: function() {
    if (this.$route.path != "/form") {
      this.$router.push("/form");
    }
  },
  Created: function() {
    this.goStep(this.step);
  }
};
</script>
<style>
.activePublic {
  position: relative;
  width: 1080px;
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-family: Roboto, Segoe UI, "Microsoft YaHei";
}

.activePublic .router-link {
  color: #fff;
}
.activePublic .but-group .el-button {
  margin-right: 20px;
}
</style>
