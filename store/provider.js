import config from "~/config/config.global";
import secureStorage from "../plugins/secure-storage";
import Cookies from "../plugins/js-cookie";

const state = () => ({
  portalProviderUUID: secureStorage.getItem("PORTAL_PROVIDERUUID"), // Store portal provider UUID
  userUUID: secureStorage.getItem("USER_UUID"), // Store user UUID
  userBalance: 0,
  userData: {}, // Store user data
  locales: ["cn", "us", "th", "la"], // Store language locales
  locale: secureStorage.getItem("lang"), // Store locale
  coinsModern: [], // Store coins modern
  isShowTutorial: false,
  isWindowsHasScroll: false,
  tutorialStepNumber: 0, // Store tutorial step number
  loginError: [], // Error occurred on the login screen
  referrer: "",
  snackBarMessage: ""
});

const mutations = {
  SET_PORTAL_PROVIDER_UUID(state, payload) {
    state.portalProviderUUID = payload;
  },
  SET_USER_UUID(state, payload) {
    state.userUUID = payload;
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  SET_COINS_MODERN(state, payload) {
    state.coinsModern = payload;
    secureStorage.setItem("coinsModern", payload);
  },
  SET_LANGUAGE(state, payload) {
    state.locale = payload;
    secureStorage.setItem("lang", payload);
  },
  SET_TOP_PLAYER(state, payload) {
    state.isLoadingTopPlayer = payload;
  },
  SET_IS_SHOW_TUTORIAL(state, payload) {
    state.isShowTutorial = payload;
  },
  SET_IS_WINDOWS_HAS_SCROLL(state, payload) {
    state.isWindowsHasScroll = payload;
  },
  SET_TUTORIAL_STEP_NUMBER(state, payload) {
    state.tutorialStepNumber = payload;
  },
  SET_LOGIN_ERROR(state, payload) {
    state.loginError.push(...payload);
  },
  SET_REFERRER(state, payload) {
    state.referrer = payload;
  },
  SET_SNACK_BAR_MESSAGE(state, payload) {
    state.snackBarMessage = payload;
  },
  SET_USER_BALANCE(state, payload) {
    state.userBalance = payload;
  },
  SET_CHIPS(state, payload) {
    state.coinsModern[payload.index] = payload.amount;
    state.coinsModern.sort((a, b) => a - b);
    secureStorage.setItem("coinsModern", state.coinsModern);
  }
};

const actions = {
  // Set user data from api
  async setUserData(context) {
    try {
      var reqBody = {
        portalProviderUUID:
          context.state.portalProviderUUID ||
          Cookies.getJSON("login").portalProviderUUID,
        userUUID: context.state.userUUID || Cookies.getJSON("login").userUUID,
        version: config.version
      };
      var res = await this.$axios.$post(config.getUserProfile.url, reqBody, {
        headers: config.header
      });
      if (res.status) {
        let userInfo = res.data;
        context.commit("SET_USER_DATA", userInfo);
        context.commit("SET_USER_UUID", userInfo.userUUID);
        context.commit("SET_USER_BALANCE", userInfo.balance);
      } else {
        throw new Error(config.error.general);
      }
    } catch (ex) {
      console.error(ex);
    }
  },
  // Set portal provider UUID
  setPortalProviderUUID({ commit }, payload) {
    commit("SET_PORTAL_PROVIDER_UUID", payload);
  },
  // Set user UUID
  setUserUUID({ commit }, payload) {
    commit("SET_USER_UUID", payload);
  },
  // Set coins modern
  setCoinsModern({ commit }, payload) {
    commit("SET_COINS_MODERN", payload);
  },
  // Set language locale
  setLanguage({ commit }, payload) {
    commit("SET_LANGUAGE", payload);
  },
  // Set is loading top player
  setTopPlayer({ commit }, payload) {
    commit("SET_TOP_PLAYER", payload);
  },
  // Set is show tutorial
  setIsShowTutorial({ commit }, payload) {
    commit("SET_IS_SHOW_TUTORIAL", payload);
  },
  // Set is windows scroll
  setIsWindowsHasScroll({ commit }, payload) {
    commit("SET_IS_WINDOWS_HAS_SCROLL", payload);
  },
  // Set tutorial's step number
  setTutorialStepNumber({ commit }, payload) {
    commit("SET_TUTORIAL_STEP_NUMBER", payload);
  },
  setLoginError({ commit }, payload) {
    commit("SET_LOGIN_ERROR", payload);
  },
  // Set portal provider's whitelabel Url
  setReferrer({ commit }, payload) {
    commit("SET_REFERRER", payload);
  },
  setSnackBarMessage({ commit }, payload) {
    commit("SET_SNACK_BAR_MESSAGE", payload);
  },
  setUserBalance({ commit }, payload) {
    commit("SET_USER_BALANCE", payload);
  },
  setChips({ commit }, payload) {
    commit("SET_CHIPS", payload);
  }
};

const getters = {
  // Get portal provider UUID
  getPortalProviderUUID(state) {
    return state.portalProviderUUID;
  },
  // Get user UUID
  getUserUUID(state) {
    return state.userUUID;
  },
  // Get user info
  getUserInfo(state) {
    return state.userData;
  },
  // Get user name
  getUserName(state) {
    return state.userData.name;
  },
  // Get portal provider user data
  getPortalProviderUser(state) {
    if (sessionStorage.getItem("userData") !== null) {
      const formData = JSON.parse(sessionStorage.getItem("userData"));
    }
    return state.formData;
  },
  // get chip amount
  getCoinsModern(state) {
    return state.coinsModern;
  },
  // get current language
  getLocale(state) {
    return state.locale;
  },
  // Get is show tutorial status
  getIsShowTutorial(state) {
    return state.isShowTutorial;
  },
  // Get is window has scroll status
  getIsWindowsHasScroll(state) {
    return state.isWindowsHasScroll;
  },
  // Get Tutorial step number
  getTutorialStepNumber(state) {
    return state.tutorialStepNumber;
  },
  getLoginError: state => {
    if (state.loginError.length > 0) {
      return state.loginError;
    } else {
      return false;
    }
  },
  getReferrer(state) {
    return state.referrer;
  },
  getUserBalance(state) {
    return state.userBalance;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
