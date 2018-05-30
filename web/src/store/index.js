import Vue from "vue";
import Vuex from "vuex";
import xinfaVersionControl from "./modules/xinfaVersionControl"
import app from "./modules/app";
import getters from "./getters";
import upload from "./modules/upload";
import deviceOrDeviceGroup from './modules/deviceOrDeviceGroup'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    xinfaVersionControl,
    app,
    upload,
    deviceOrDeviceGroup
  },
  getters
});

export default store;
