import isJSON from "../helpers/isJSON";
const LocalStorage = window.localStorage;

const state = {
  info:
    "// This settings.js file exposes all Monaco Editor options (https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)",

  user: {
    fontSize: "16px",
    tabSize: 2,
    theme: "vs-dark",
    minimap: { enabled: false },
  },

  colors: {
    // TODO: incorporate these with CSS
    tabText: "#848484",
    tabTextActive: "#ffffff",
    tabTextHover: "#848484",

    tabBackground: "#1e1e1e",
    tabBackgroundActive: "#1e1e1e",
    tabBackgroundHover: "#1e1e1e",

    tabBorder: "#242424",
    tabBorderActive: "#569cd6",
    tabBorderHover: "#242424",

    tabBarBackground: "#1e1e1e",
    tabBarBorder: "#242424",
  },

  defaults: {
    fontSize: "16px",
    tabSize: 2,
    theme: "vs-dark",
    minimap: { enabled: false },
    automaticLayout: true, // this is how monaco handles responsiveness/resizing
    scrollBeyondLastLine: false,
    lineNumbersMinChars: 4,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    language: "javascript", // TBD: should this be allowed to be "typescript" based on file extension?
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
    const defaults = {
      fontSize: "16px",
      tabSize: 2,
      theme: "vs-dark",
      minimap: { enabled: false },
    };
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
