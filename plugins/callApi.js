import openSocket from "socket.io-client";
export default ({ store }) => {

    //coin modern set and get from localStorage
    initLocalStorageCoin(store)
        // set language
    setLanguage(store)
    store.dispatch("asynUserInfo")
}

function setLanguage(store) {
    let lang = localStorage.getItem("lang");
    if (lang == null) {
        store.commit('SET_LANG', "cn")
        localStorage.setItem("lang", store.getters.getlocale);
    }
}

function initLocalStorageCoin(store) {
    let coins = localStorage.getItem("coinModern");
    // alert(coins)
    if (coins == null) {
        let defaultCoin = '["100", "500", "1000", "5000", "10000"]'
        localStorage.setItem("coinModern", defaultCoin);
    }
    store.commit('setCoins_modern')
}