// src/store.js
import { createStore } from "vuex";

const user = {
  namespaced: true,
  state: {
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit("SET_CURRENT_USER", user);
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
};

export default createStore({
  modules: {
    user,
  },
});
