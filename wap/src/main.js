// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Mint from "mint-ui";
import FastClick from "fastclick";
// import './../node_modules/_normalize.css@7.0.0@normalize.css/normalize.css'
import "mint-ui/lib/style.css";
import "./assets/base/mintUi.css";
import "./assets/base/base.css";
import store from "./store";
import { esell } from "./common/esellapi";
import { DatetimePlugin } from "vux";

Vue.use(DatetimePlugin);
// Vue.component('datetime', Datetime)
Vue.use(Mint);
FastClick.attach(document.body);
Vue.config.productionTip = false;
const esellApi = new esell();
Vue.prototype.$esellApi = esellApi;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
