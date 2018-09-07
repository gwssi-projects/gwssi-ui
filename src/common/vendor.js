//vendor.js会将引入的所有公共模块统一打包 其它ja中import相同模块则不再单独打入，减少JS体积
//核心包
import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import axios from 'axios'


//基础组件
//工具类
import tools from "@components/tools";
//语言包
import i18n from "@components/i18n";
import selectLang from "@components/select-lang";
//request
import request from "@components/request";
//theme
import theme from "@components/theme";
//hashMap
import hashMap from "@components/hashMap";

//mock
import mock from '@mock/index'

//store对象
import store from '@store/index'

//api
import api from '@/common/api'

//注册全局对象
window.gwI18n = i18n;
window.i18n = i18n.vueLocale;
window.gwTools = tools;