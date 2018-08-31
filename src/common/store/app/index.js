import tools from "../../components/tools";

export const themeColorKey = 'theme-color'
const defaultColor = '#409eff';

export const contentLanguageKey = 'content-language'
const defaultLanguage = 'zh-cn'

const day = 100;


//有的组件中获取到 store 中的state,  需要对进行加工才能使用，computed 属性中就需要写操作函数，如果有多个组件中都需要进行这个操作，那么在各个组件中都写相同的函数，那就非常麻烦。
//这时可以把这个相同的操作写到store 中的getters,  每个组件只要引用getter 就可以。
//getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

const app = {
  state: {
    //主题颜色
    themeColor: defaultColor,
    //语言
    language: defaultLanguage
  },

  getters: {

    //默认颜色
    defaultColor: state => state.themeColor,
    //主题颜色
    themeColor: state => {
      var color = tools.getCookie(themeColorKey);
      return color;
    },
    //默认语言
    defaultLanguage: state => state.language,
    //语言
    language: state => {
      var key = contentLanguageKey;

      //这部分可以通过浏览器来选择默认语言(第一次语言设置在初始化window.i18n的代码中进行)，这里首先通过参数和cookie判断语言
      var lang = tools.getQueryString(key);
      if (lang == null) {
        lang = tools.getCookie(key);
      }

      if (lang != null && lang != "") {
      } else {
        lang = state.language;
      }

      return lang;

    }

  },

  //必须通过提交 mutation 的方式，而非直接改变 store.state，各组件才能明确地追踪到状态的变化。
  mutations: {

    //箭头函数 相当于  SET_THEMECOLOR (state, val) {
    SET_THEMECOLOR: (state, val) => {
      //更新cookie 如果是多级域名，是需要设置domain的
      state.themeColor = val;
      tools.setCookie(themeColorKey, val, day, "/");
      console.log("设置" + themeColorKey + " = " + val);
    },

    SET_LANGUAGE: (state, val) => {
      //更新cookie 如果是多级域名，是需要设置domain的
      state.language = val;
      tools.setCookie(contentLanguageKey, val, day, "/");
      console.log("设置" + contentLanguageKey + " = " + val);
    }

  },
  actions: {
    setThemeColor({ commit }, color) {
      commit('SET_THEMECOLOR', color)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
