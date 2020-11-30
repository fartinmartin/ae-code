import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { host } from "../globals";
import getFileContents from "../helpers/getFileContents";
import router from "../router";

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

  addTab(state, tab) {
    state.list.push(tab);
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

  // async getModel({ commit }, value) {
  //   // ⚠️ TODO: finish this...
  //   const { i, path } = value;
  //   const code = await getFileContents(path.join(__dirname, path));
  //   commit("setModel", {
  //     tab: i,
  //     model: monaco.editor.createModel(code, "javascript"),
  //   });
  // },

  setTitle({ commit }, { tab, title }) {
    commit("setTitle", { tab, title });
    this.$router.push({ params: { title, path: tab.path } }); // may be unnecessary?
  },

  addTab({ commit, getters }, payload) {
    let tab;

    if (!payload) {
      tab = {
        title: getters.getUniqueUntitled,
        path: `tmp/${Date.now()}.jsx`,
        monaco: {
          model: monaco.editor.createModel("", "javascript"),
          state: null,
        },
      };
    } else {
      tab = payload;
    }

    commit("addTab", tab);
    router.push({ params: { title: tab.title, path: tab.path } });
  },
};

const getters = {
  initialTab: (state) =>
    localStorage.getItem("lastActiveTab") /* .title */ || state.list[0],

  getUniqueUntitled: (state) => {
    const n = 1 + state.list.filter((t) => t.title.includes("untitled")).length;
    return `untitled_${n.toString().padStart(2, "0")}.jsx`;
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
