import { defaults, userDefaults } from "../assets/settings";

const state = {
  user: userDefaults,
  defaults,
};

const mutations = {
  setSettings(state, value) {
    state.user = value;
  },
};

const actions = {
  getSettings({ commit }) {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings) commit("setSettings", settings);
  },

  saveSettings({ state, commit }, settings) {
    // const settings = JSON.parse(tab.monaco.model.getValue()); // don't pass the tab to this function, just pass the value!
    commit("setSettings", settings);
    localStorage.setItem("settings", JSON.stringify(state.user));
    location.reload();
  },

  deleteSettings({ dispatch }) {
    localStorage.removeItem("settings");
    dispatch("resetSettings");
  },

  resetSettings({ commit }) {
    commit("setSettings", userDefaults);
  },
};

const getters = {
  settings: (state) => ({ ...state.defaults, ...state.user }),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
