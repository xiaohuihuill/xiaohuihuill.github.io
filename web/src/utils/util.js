import { esell } from "@/assets/common/esellapi";
export default {
  install(Vue, options) {
    Vue.prototype.getRegionData = function() {
      const esellApi = new esell();
      esellApi.send(
        "/district/list.shtml",
        {},
        res => {
          return res.payload;
        },
        res => {
          console.log("错误了");
        }
      );
    };
  }
};
