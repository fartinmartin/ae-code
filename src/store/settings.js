import isJSON from "../helpers/isJSON";
const LocalStorage = window.localStorage;

const state = {
  info:
    "// This settings.js file exposes all Monaco Editor options (https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)",

  user: {
    fontSize: "16px",
    tabSize: 2,
    theme: "vs-dark",
  },

  defaults: {
    automaticLayout: true, // this is how monaco handles responsiveness/resizing
    tabSize: 4,
    scrollBeyondLastLine: false,
    lineNumbersMinChars: 4,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
  },
};

const mutations = {
  setSettings(state, value) {
    state.settings.user = value;
  },
};

const actions = {
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings)
      commit("setSettings", isJSON(settings) ? JSON.parse(settings) : settings);
  },

  saveSettings({ state }) {
    LocalStorage.setItem("settings", JSON.stringify(state.user));
  },

  deleteSettings({ dispatch, state }) {
    LocalStorage.removeItem(state.user);
    dispatch("resetSettings");
  },

  resetSettings({ commit }) {
    const defaults = { fontSize: "16px", tabSize: 2, theme: "vs-dark" };
    commit("setSettings", defaults);
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
