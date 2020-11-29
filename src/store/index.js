import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import todos from './modules/todos';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: false,
  },
  mutations: {},
  actions: {
    toggleDarkMode({ state }, val) {
      if (val === true) state.dark = true;
      else if (val === false) state.dark = false;
      else state.dark = !state.dark;
      localStorage.dark = state.dark;
    },
  },
  modules: {
    auth,
    todos,
  },
});
