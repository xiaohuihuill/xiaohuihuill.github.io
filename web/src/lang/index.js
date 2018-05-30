import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import en from "./en";
import cn from "./cn";
Vue.use(VueI18n);
const messages = {
  cn: {
    ...cn,
    ...elementZhLocale
  },
  en: {
    ...en,
    ...elementEnLocale
  }
};
const i18n = new VueI18n({
  locale: Cookies.get("language") || "cn",
  messages
});

export default i18n;
