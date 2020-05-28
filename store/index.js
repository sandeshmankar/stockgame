import Vuex from "vuex";

import betting from "./betting";
import stock from "./stock";
import provider from "./provider";
import roadMap from "./roadMap";
import game from "./game";
const createStore = () => {

  return new Vuex.Store({
    modules: {
      betting,
      stock,
      provider,
      roadMap,
      game
     
    }
  });
};

export default createStore;
