import Vue from "vue";
import VueI18n from "vue-i18n";
import secureStorage from "./secure-storage";

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: secureStorage.getItem('lang') || 'cn',
    fallbackLocale: "cn",
    messages: {
      us: require("~/locales/us.json"),
      cn: require("~/locales/cn.json"),
      th: require("~/locales/th.json"),
      la: require("~/locales/la.json")
    }
  });

  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
