import secureStorage from "../plugins/secure-storage";
import Cookies from "../plugins/js-cookie";

export default function({ isHMR, app, store, route, error, redirect }) {
  try {
    // Check if the user session is a valid session
    if (
      Cookies.getJSON("login").userUUID &&
      Cookies.getJSON("login").portalProviderUUID
    ) {
      // If middleware is called from hot module replacement, ignore it
      if (isHMR) {
        return;
      }

      // If middleware is called from hot module replacement, ignore it
      if (route.path === "/") {
        return;
      }

      // if (!store.getters.checkAuth) {
      //     // call Api to show in chart and store it in Vuex

      //     // redirect to whitelabel
      //     app.router.push('/')
      // }
    } else {
      throw new Error("You are not authorized. Please login again");
    }
  } catch (ex) {
    console.log(ex);
    // Redirect to portal provider login page if there is no session
    window.location.replace(`http://${secureStorage.getItem("referrerUrl")}/`);
  }
}
