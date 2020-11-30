import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { host } from "../globals";
import getFileContents from "../helpers/getFileContents";
const path = require("path");

const state = {
  list: [
    {
      title: "example.jsx",
      path: `src/assets/examples/${host.appName}.jsx`,
      monaco: {
        model: null,
        state: null,
      },
    },
    {
      title: "settings.js",
      path: `src/assets/settings.js`,
      monaco: {
        model: null,
        state: null,
      },
    },
  ],
};

const mutations = {
  setModel(state, { tab, model }) {
    state.list[tab].monaco.model = model;
  },

  setTitle(state, { tab, title }) {
    state.list[tab].title = title;
  },
};

const actions = {
  getModels({ state, commit }) {
    state.list.forEach(async (tab, i) => {
      const code = await getFileContents(path.join(__dirname, tab.path));
      commit("setModel", {
        tab: i,
        model: monaco.editor.createModel(code, "javascript"),
      });
    });
  },

  async getModel({ commit }, value) {
    // ⚠️ TODO: finish this...
    const { i, path } = value;
    const code = await getFileContents(path.join(__dirname, path));
    commit("setModel", {
      tab: i,
      model: monaco.editor.createModel(code, "javascript"),
    });
  },

  setTitle({ commit }, { tab, title }) {
    commit("setTitle", { tab, title });
    this.$router.push({ params: { title, path: tab.path } }); // may be unnecessary?
  },
};

const getters = {
  initialTab: (state) =>
    localStorage.getItem("lastActiveTab") /* .title */ || state.list[0],

  getUniqueUntitled: (state) => {
    const n = state.list.filter((tab) => tab.title.includes("untitled"));
    return `untitled_${n.padStart(2, "0")}.jsx`;
  },

  getTabByPath: (state) => (path) =>
    state.list.find((tab) => tab.path === path),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
