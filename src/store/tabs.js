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
  ],
};

const mutations = {
  setModel(state, { tab, model }) {
    state.list[tab].monaco.model = model;
  },

  addTab(state, tab) {
    state.list.push(tab);
  },

  removeTab(state, tab) {
    state.list = state.list.filter((t) => t != tab);
  },

  setSession(state, session) {
    state.list = session.tabs;
  },

  // TODO:
  // setTitle(state, { tab, title }) {
  //   state.list[tab].title = title;
  // },
};

const actions = {
  // TODO:
  // setTitle({ commit }, { tab, title }) {
  //   commit("setTitle", { tab, title });
  //   this.$router.push({ params: { title, path: tab.path } }); // may be unnecessary?
  // },

  getSession({ commit }) {
    const session = JSON.parse(localStorage.getItem("session"));
    console.log(session);
    if (session) commit("setSession", session);
  },

  getModels({ state, commit }) {
    state.list.forEach(async (tab, i) => {
      let code;
      try {
        code = await getFileContents(path.join(__dirname, tab.path)); // TODO: "__dirname" will probs break if file saved outside of extention dir, right?
      } catch (error) {
        code = "";
      }
      commit("setModel", {
        tab: i,
        model: monaco.editor.createModel(code, "javascript"),
      });
    });
  },

  addTab({ commit, getters }, payload) {
    let tab;

    if (!payload) {
      tab = {
        title: getters.uniqueUntitled,
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

  closeTab({ commit, state, dispatch }, { tab, reRouteMe }) {
    // TODO: store tab (and it's index within state.list) in a state.history array for "re-open closed tab" functionality
    if (reRouteMe) router.go(-1);
    commit("removeTab", tab);
    if (!state.list.length) dispatch("addTab");
    // save settings to local storage?
  },

  openFile({ getters, dispatch }, tab) {
    if (getters.tabByPath(tab.path))
      router.push({ params: { title: tab.title, path: tab.path } });
    else dispatch("addTab", tab);
  },

  saveFile({ dispatch }, tab) {
    if (tab.path === `src/assets/settings.json`)
      dispatch("settings/saveSettings", tab, { root: true });
  },

  saveSession({ state, getters }) {
    const simpleTabs = state.list.map((tab) => ({ ...tab, monaco: {} }));
    const session = { tabs: simpleTabs, active: getters.activeTab };
    localStorage.setItem("session", JSON.stringify(session));
  },

  createSettingsTab({ commit, rootState }) {
    const obj = rootState.settings.user;
    const string = JSON.stringify(obj, null, obj.tabSize || 2);

    commit("addTab", {
      title: "settings.json",
      path: `src/assets/settings.json`,
      monaco: {
        model: monaco.editor.createModel(string, "json"),
        state: null,
      },
    });
  },
};

const getters = {
  initialTab: (state, getters) => {
    getters.tabByPath(localStorage.getItem("session").activeTab) ||
      state.list[0];
  },

  uniqueUntitled: (state) => {
    const n = 1 + state.list.filter((t) => t.title.includes("untitled")).length;
    return `untitled_${n.toString().padStart(2, "0")}.jsx`;
  },

  tabByPath: (state) => (path) => state.list.find((tab) => tab.path === path),

  activeTab: (state, getters) => {
    const tab = getters.tabByPath(router.history.current.params.path);
    return state.list.indexOf(tab);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
