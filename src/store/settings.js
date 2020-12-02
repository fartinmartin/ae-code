import defaultUserSettings from "../assets/defaultUserSettings";
const state = {
  user: defaultUserSettings,

  defaults: {
    automaticLayout: true, // this is how monaco handles responsiveness/resizing
    scrollBeyondLastLine: false,
    lineNumbersMinChars: 4,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
  },
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

  saveSettings({ state, commit }, tab) {
    const userSettings = JSON.parse(tab.monaco.model.getValue());
    commit("setSettings", userSettings);
    localStorage.setItem("settings", JSON.stringify(state.user));
    location.reload();
  },

  deleteSettings({ dispatch }) {
    localStorage.removeItem("settings");
    dispatch("resetSettings");
  },

  resetSettings({ commit }) {
    commit("setSettings", defaultUserSettings);
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
