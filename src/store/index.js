/* eslint-disable */
import { createStore } from "vuex";
import main from "./modules/main";
import core from "./core";

const storeModules = {
  modules: {
    main,
    core
  },
};
  const state = {
    currentTheme: "dark", // Default theme
  };
  
  const mutations = {
    setTheme(state, newTheme) {
      state.currentTheme = newTheme; // Update the current theme
    },
  };
  
  const getters = {
    currentTheme: (state) => state.currentTheme, // Getter for current theme
    
  };


export default createStore(storeModules);
