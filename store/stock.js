import config from "~/config/config.global";
import stock from "~/data/stockList";
import secureStorage from "../plugins/secure-storage";

const state = () => ({
  stocks: stock.stockList,
  stockCategory: [], // Store Stocks category
  stockPrice: [], // Store stock list price
  stockCountdown: [], // Store stock list Countdown
});

const mutations = {
  SET_STOCK_CATEGORY(state, payload) {
    state.stockCategory = payload;
  },
  SET_STOCKS_DATA(state, payload) {
    state.stocks = payload;
  },
  SET_STOCK_COUNTDOWN(state, payload) {
    state.stockCountdown = payload;
  },
  SET_STOCK_PRICE(state, payload) {
    state.stockPrice.unshift(payload);
    if (state.stockPrice.length > 2) {
      state.stockPrice.pop();
    }
  }
};

const actions = {
  // Set Stocks data
  async setStocksData(context) {
    try {
      var reqBody = {
        portalProviderUUID: context.rootState.portalProviderUUID,
        version: config.version
      };
      var res = await this.$axios.$post(config.getStock.url, reqBody, {
        headers: config.header
      });
      if (res.status) {
        context.commit("SET_STOCKS_DATA", res.data);
      } else {
        throw new Error(config.error.general);
      }
    } catch (ex) {
      console.log(ex);
    }
  },
  // Set stocks category
  setStockCategory({ commit }, payload) {
    commit("SET_STOCK_CATEGORY", payload);
  },
  // Set stock list price
  setStockPrice({ commit }, payload) {
    commit("SET_STOCK_PRICE", payload);
  },
  // Set stock list countdown
  setStockCountdown({ commit }, payload) {
    commit("SET_STOCK_COUNTDOWN", payload);
  }
};

const getters = {
  // Get game UUID by stock name
  getGameUUIDByStockName: state => stockName => {
    // check is it a btc stock
    let loop = "";
    if (stockName === "btc5") {
      loop = 5;
    } else {
      loop = 1;
    }
    if (stockName === "btc1" || stockName === "btc5") {
      stockName = "btc";
    }
    if (state.stockCategory.length > 0) {
      for (let i = 0; i < state.stockCategory.length; i++) {
        for (let j = 0; j < state.stockCategory[i].stocks.length; j++) {
          if (state.stockCategory[i].stocks[j].stockName === stockName) {
            if (stockName !== "btc") {
              return state.stockCategory[i].stocks[j].loops[0].gameID;
            } else {
              for (
                let a = 0;
                a < state.stockCategory[i].stocks[j].loops.length;
                a++
              ) {
                if (
                  state.stockCategory[i].stocks[j].loops[a].loopName === loop
                ) {
                  return state.stockCategory[i].stocks[j].loops[a].gameID;
                }
              }
            }
          }
        }
      }
    } else {
      return "....";
    }
  },
  // Get stock category
  getStockCategory(state) {
    return state.stockCategory;
  },
  // Get all stocks data
  getAllStocks(state) {
    return state.stocks;
  },
  // get stock loop by stock name
  getStockLoop: state => stockName => {
    let result = null;
    for (let i = 0; i < state.stocks.length; i++) {
      if (state.stocks[i].stockName === stockName) {
        result = state.stocks[i].loop;
        break;
      }
    }
    return result;
  },
  // Get stock live price by stock name
  getStockLivePrice: state => stockName => {
    if (!stockName || state.stockPrice.length == 0) {
      return null;
    }
    return state.stockPrice[0].find(stock => stock.stockName == stockName)
      .stockPrice;
  },
  // Get stock live time by stock name
  getStockLiveTime: state => stockName => {
    if (!stockName || state.stockCountdown.length == 0) {
      return null;
    }
    return state.stockCountdown.find(stock => stock.stockName == stockName)
      .stockTimestamp;
  },
  // Get timer by stock name
  getTimerByStockName: state => stockName => {
    if (!stockName || state.stockCountdown.length == 0) {
      return null;
    }
    return state.stockCountdown.find(stock => stock.stockName == stockName);
  },
  // Get stock list countdown
  getStockListCountdown(state) {
    return state.stockCountdown;
  },
  // Get stock price
  getStockListPrice(state) {
    return state.stockPrice;
  },
  // Get stock UUID by stock name
  getStockUUIDByStockName: state => stockName => {
    let result = null;
    for (let i = 0; i < state.stocks.length; i++) {
      if (state.stocks[i].stockName == stockName) {
        result = state.stocks[i].stockUUID;
        break;
      }
    }
    return result;
  },
  // Check if the stock(by stock name) exists in the stocks data
  getCheckStock: state => stockname => {
    let result = false;
    state.stocks.forEach(element => {
      if (element.stockName === stockname) {
        result = true;
      }
    });
    return result;
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};
