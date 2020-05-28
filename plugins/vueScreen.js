import Vue from "vue";
import VueScreen from "vue-screen";

Vue.use(VueScreen, {
  extend: "bootstrap",
  tablet: screen => screen.md && !screen.xl && screen.touch
});
