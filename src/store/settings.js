const state = {
  // temp, default state should be the same as what shows up in settings.json tab and a copy should be stored in resetSettings() action:
  json: `{
    "___⚠️ settings.json___": [
      "Hello! Welcome to ae-code. This is the settings.json",
      "file where you can tweak (mostly visual) options by",
      "adding/removing key-vaule pairs to this object.",
      "",
      "For a full list of options, check out the README.md:",
      "https://github.com/fartinmartin/ae-code#settings.js"
    ],
    "fontSize": "16px",
    "tabSize": 2,
    "theme": "vs-dark",
    "minimap": {
      "enabled": false
    }
  }`,

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

  deleteSettings({ dispatch, state }) {
    localStorage.removeItem(state.user);
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
