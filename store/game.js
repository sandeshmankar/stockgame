import payouts from "../data/json/payout.json";

const state = () => ({
  activeGameChannel: true,
  isLoadingStockGame: false,
  gameStockId: null, // Store game stock id
  stockMultiGame: [], // Store stocks of multi game
  payout: payouts // Store payouts
});

const mutations = {
  SET_GAME_ID(state, payload) {
    state.gameStockId = payload;
  },
  SET_GAME_CHANNEL_SHOW(state, value) {
    state.activeGameChannel = value;
  },
  SET_IS_LOADING_STOCK_GAME(state, value) {
    state.isLoadingStockGame = value;
  },
  // add more stock to multi game
  ADD_STOCK_MULTI_GAME(state, stockId) {
    if (state.stockMultiGame.includes(stockId)) return;
    state.stockMultiGame.push(stockId);
  }
};

const actions = {
  // Set game id
  setGameId({ commit }, payload) {
    commit("SET_GAME_ID", payload);
  },
  // Set game channel show
  setGameChannelShow({ commit }, payload) {
    commit("SET_GAME_CHANNEL_SHOW", payload);
  },
  // Set is loading stock game
  setIsLoadingStockGame({ commit }, payload) {
    commit("SET_IS_LOADING_STOCK_GAME", payload);
  },
  // Add stock to multi game
  addStockMultiGame({ commit }, payload) {
    commit("ADD_STOCK_MULTI_GAME", payload);
  }
};

const getters = {
  // Get active game channel
  getGameChannel(state) {
    return state.activeGameChannel;
  },
  // Get is loading stock game status
  getIsLoadingStockGame(state) {
    return state.isLoadingStockGame;
  },
  // get stock id(active stocks) in multi game
  getStockMultiGame(state) {
    return state.stockMultiGame;
  },
  // Get game stock id
  getStockGameId(state) {
    return state.gameStockId;
  },
  // Check stock in multi game if exists disable button
  checkMultiGameExistAndDisable: state => data => {
    if (!data.isMultigame) return "";
    const result = state.stockMultiGame.includes(data.stockId);
    if (result) return "pointer-events: none";
    else return "";
  },
  // Check stock in multi game if exists show icon "check"
  checkMultiGameExistAndShowIcon: state => data => {
    if (!data.isMultigame) return false;
    const result = state.stockMultiGame.includes(data.stockId);
    if (result) return true;
    else return false;
  },
  // Get payout by game rule
  getPayout: state => gameRule => {
    {
      // console.log(state.payout[gameRule])
      return state.payout[gameRule];
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
