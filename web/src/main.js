// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import _ from "lodash";
Vue.prototype._ = _;
import router from "./router";
import ElementUi from "element-ui";
import Sortable from "sortablejs";
import "babel-polyfill";
import "element-ui/lib/theme-default/index.css";
import VueWechatTitle from "vue-wechat-title";
import "./assets/base/elementUi.css";
import "./assets/base/base.css";
import i18n from "./lang"; // Internationalization
import { esell } from "./assets/common/esellapi";
import echarts from "echarts";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

Vue.use(VueWechatTitle);
Vue.use(ElementUi);

Vue.use(ElementUi, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});
Vue.prototype.message = function(type, data) {
  this.$message({
    type: type,
    message: data
  });
};

//使用方法this.message("error",res.message,()=>{})
const esellApi = new esell();
Vue.prototype.$esellApi = esellApi;
Vue.prototype.$echarts = echarts;

import store from "./store";
Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  template: "<App/>",
  components: {
    App
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  esellApi.checkPermissions();
  next();
  // const token = localStorage.getItem("token");
  // if (to.path == "/home" && !token && from.path == "/") {
  //   console.log("没有token的");
  //   next({
  //     path: "/"
  //   });
  // } else {
  //   next();
  // }
});
router.afterEach((to, from, next) => {
  NProgress.done(); // finish progress bar
});
// console.log(121, window.location.href);
// var neutral = {
//   logo: "",
//   text: "云信发"
// };
// var yixinfa = {
//   logo: "",
//   text: "易信发"
// };
// var xinfaSystemParameter = {};
// if (
//   window.location.href.match("dev-") ||
//   window.location.href.match("localhost")
// ) {
//   xinfaSystemParameter = yixinfa;
// } else {
//   xinfaSystemParameter = neutral;
// }
// console.log(1,xinfaSystemParameter);
// sessionStorage.setItem("xinfaSystemParameter",xinfaSystemParameter)
