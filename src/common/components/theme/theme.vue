<template>
  <el-color-picker v-model="colors.primary" @active-change="activeChange" @change="colorChange"></el-color-picker>
</template>

<script>
//主要参考 https://elementui.github.io/theme-chalk-preview/#/en-US
import objectAssign from "object-assign";
import generateColors from "./color";

export default {
  name: "gw-color-picker",
  methods: {
    writeNewStyle() {
      //更新vue组件颜色
      console.log("更新VUE组件颜色" + this.colors.primary);

      this.colors = objectAssign(
        {},
        this.colors,
        generateColors(this.colors.primary)
      );

      let cssText = this.originalStyle;
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp("(:|\\s+)" + key, "g"),
          "$1" + this.colors[key]
        );
      });

      //debugger;
      //console.log("cssText=" + cssText);
      //异步加载主题css，第一次打开页面替换主题的话会导致基础模版构建不出来，cssText为空
      if (cssText == null || cssText == "") {
        return;
      }

      if (this.originalStylesheetCount === document.styleSheets.length) {
        const style = document.createElement("style");
        style.innerText = cssText;
        document.head.appendChild(style);
      } else {
        document.head.lastChild.innerText = cssText;
      }
    },

    colorChange: function() {
      //触发颜色更新事件 返回给父页面
      this.$emit("colorChange", this.colors.primary);

      //更新vue组件颜色
      this.writeNewStyle();

      //记录颜色更改至cookie中
      gwTools.setCookie("theme-color", this.colors.primary, 100, "/");
    },
    activeChange: function() {
      //触发颜色更新事件 返回给父页面
      this.$emit("activeChange", this.colors.primary);
    },

    getIndexStyle() {
      this.getFile("/static/element-ui/2.4.6/lib/theme-chalk/index.css").then(
        ({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        }
      );
    },

    getStyleTemplate(data) {
      const colorMap = {
        "#3a8ee6": "shade-1",
        "#409eff": "primary",
        "#53a8ff": "light-1",
        "#66b1ff": "light-2",
        "#79bbff": "light-3",
        "#8cc5ff": "light-4",
        "#a0cfff": "light-5",
        "#b3d8ff": "light-6",
        "#c6e2ff": "light-7",
        "#d9ecff": "light-8",
        "#ecf5ff": "light-9"
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, "ig"), value);
      });
      return data;
    },

    getFile(url, isBlob = false) {
      //异步加载模块Promise
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.responseType = isBlob ? "blob" : "";
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return;
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split("/");
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            });
          } else {
            reject(new Error(client.statusText));
          }
        };
        //同步方式请求 防止整个主题style没加载完显示页面
        //client.open("GET", url, false);
        client.open("GET", url);
        client.send();
      });
    },

    getSeparatedStyles() {
      this.getFile("/static/element-ui/2.4.6/lib/theme-chalk/")
        .then(({ data }) => {
          return data
            .match(/href="[\w-]+\.css"/g)
            .map(str => str.split('"')[1]);
        })
        .then(styleFiles => {
          //Promise.all可以将多个Promise实例包装成一个新的Promise实例。
          //同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
          return Promise.all(
            styleFiles.map(file => {
              return this.getFile(
                `/static/element-ui/2.4.6/lib/theme-chalk/${file}`
              );
            })
          );
        })
        .then(files => {
          this.styleFiles = files.map(file => {
            return {
              name: file.url,
              data: this.getStyleTemplate(file.data)
            };
          });
        });
    },

    getFontFiles() {
      Promise.all(
        this.fontFiles.map(font => {
          return this.getFile(
            `/static/element-ui/2.4.6/lib/theme-chalk/fonts/${font}`,
            true
          );
        })
      ).then(fonts => {
        this.fonts = fonts;
      });
    }
  },

  created() {
    this.getIndexStyle();
    this.getSeparatedStyles();
    this.getFontFiles();
  },

  //通过监听的方式解决 异步加载主题css，第一次打开页面替换主题的话会导致基础模版构建不出来的问题
  watch: {
    originalStyle: function(val, oldVal) {
      console.log("originalStyle change");
    },
    styleFiles: function(val, oldVal) {
      //以此作为最后加载完毕的判断
      console.log("styleFiles change");

      var color = gwTools.getCookie("theme-color");
      if (color != null && color != "") {
        this.colors.primary = color;
      }

      //如果默认颜色不相同的话 执行更新主题操作
      if ((this.colors.primary + "").toLowerCase() != this.primaryColor) {
        this.$emit("colorChange", this.colors.primary);
        this.writeNewStyle();
        //更新颜色cookie时间
        gwTools.setCookie("theme-color", this.colors.primary, 100, "/");
      }
    },
    fonts: function(val, oldVal) {
      console.log("fonts change");
    }
  },

  mounted: function() {
    //在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
    //防止某些异步操作出错
    this.$nextTick(() => {
      this.originalStylesheetCount = document.styleSheets.length;
      console.info("theme color = " + this.colors.primary);
    });
  },

  beforeCreate: function() {},

  props: {
    //项目中的默认颜色
    defaultColor: String,
    obj: Object
  },

  data() {
    return {
      colors: {
        primary: this.defaultColor
      },
      //elementUI的默认颜色
      primaryColor: "#409eff",

      originalStylesheetCount: -1,
      originalStyle: "",
      styleFiles: [],
      fontFiles: ["element-icons.ttf", "element-icons.woff"],
      fonts: []
    };
  }
};
</script>

<style lang="less">
/**
@import './lang.less'; **/
</style>
