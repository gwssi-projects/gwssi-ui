<template>
  <div v-loading="loading">
    <slot></slot>
  </div>
</template>

<script>
import request from "@components/request";
import { Notification } from "element-ui";

export default {
  name: "gw-grid",

  props: {
    action: {
      type: String,
      default: ""
    },
    form: {
      type: Object,
      default: function() {
        return {
          //每页显示数量，默认10条
          pageSize: 10,
          //当前页，默认为1，从1开始
          currentPage: 1
        };
      }
    }
  },

  data() {
    return {
      //loading层
      loading: false,
      //获取的数据对象
      data: Object,
      //总数
      total: Number
    };
  },

  beforeCreate() {},

  beforeDestroy() {},

  computed: {},

  methods: {
    query(formObj) {
      //判断配置项是否齐全
      if (this.action == null || this.action == "") {
        Notification({
          title: "Grid配置错误",
          type: "error",
          message: "action不存在"
        });

        return;
      }

      this.loading = true;

      //所有的错误判断已经封装到了request中
      //箭头函数中可以直接使用this
      request.get(this.action, null).then(
        json => {
          this.data = json.data.content;
          this.loading = false;
          //更新对应数据
          console.log('更新数据');
          this.$emit("updateGrid", this.data);
        },
        error => {
          this.loading = false;
          console.error("获取数据错误：", error);
        }
      );
    }
  },

  mounted() {}
};
</script>




