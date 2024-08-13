import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    }
  },
  actions: {
    checkAuth({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setLoggedIn', true);
      } else {
        commit('setLoggedIn', false);
      }
    }
  }
});