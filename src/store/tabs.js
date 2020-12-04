// import fileDialog from "file-dialog";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { host } from "../globals";
import getFileContents from "../helpers/getFileContents";
import router from "../router";

const path = require("path");

const state = {
  list: [
    {
      title: "example.jsx",
      path: path.join(__dirname, `src/assets/examples/${host.appName}.jsx`), // is it correct to store/access files from the src/ dir while in prod?
      monaco: {},
    },
  ],

  example: {
    title: "example.jsx",
    path: path.join(__dirname, `src/assets/examples/${host.appName}.jsx`), // is it correct to store/access files from the src/ dir while in prod?
    monaco: {},
  },

  settings: {
    title: "settings.json",
    path: `settings.json`,
    monaco: {},
  },

  previous: null,
};

const mutations = {
  setModel(state, { index, model }) {
    state.list[index].monaco.model = model;
  },

  addTab(state, tab) {
    state.list.push(tab);
  },

  removeTab(state, tab) {
    state.list = state.list.filter((t) => t.path != tab.path);
  },

  setPrevious(state, previous) {
    state.list = previous.tabs;
    state.previous = { activeTab: previous.activeTab }; // an object, because maybe there will be more info to store...
  },

  // TODO:
  // setTitle(state, { tab, title }) {
  //   state.list[tab].title = title;
  // },
};

const actions = {
  getPrevious({ commit }) {
    const previous = JSON.parse(localStorage.getItem("previous"));
    if (previous) commit("setPrevious", previous);
  },

  getModels({ state, commit }) {
    state.list.forEach(async (tab, index) => {
      let code = await getFileContents(path.join(tab.path));
      const model = monaco.editor.createModel(code, "javascript");
      commit("setModel", { index, model });
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
    router.push({ name: "edit", params: { path: tab.path } });
  },

  closeTab({ commit, state, dispatch }, tab) {
    // TODO: store tab (and it's index within state.list) in a state.history array for "re-open closed tab" functionality
    commit("removeTab", tab);
    if (!state.list.length) dispatch("addTab");
  },

  savePrevious({ state, getters }) {
    const simpleTabs = state.list.map((tab) => ({ ...tab, monaco: {} }));
    const activeTab = { ...getters.activeTab, monaco: {} };
    const previous = JSON.stringify({ tabs: simpleTabs, activeTab });
    localStorage.setItem("previous", previous);
  },

  deletePrevious({ commit }) {
    localStorage.removeItem("previous");
    commit("setPrevious", { tabs: null, activeTab: null });
  },

  // TODO:
  // setTitle({ commit }, { tab, title }) {
  //   commit("setTitle", { tab, title });
  //   this.$router.push({ params: { title, path: tab.path } }); // may be unnecessary?
  // },

  // async openFile({ dispatch }) {
  //   const [file] = await fileDialog({ accept: ".jsx, .js" });
  //   const tab = { title: path.basename(file.path), path: file.path };
  //   if (getters.tabByPath(file.path)) {
  //     router.push({ params: tab });
  //   } else {
  //     dispatch("addTab", tab);
  //     dispatch("getModels"); // don't get ALL the models! 🤔
  //   }
  // },

  // saveFile({ dispatch }, tab) {
  //   if (tab.path === `src/assets/settings.json`)
  //     dispatch("settings/saveSettings", tab, { root: true });
  // },

  // createSettingsTab({ commit, rootState }) {
  //   const obj = rootState.settings.user;
  //   const string = JSON.stringify(obj, null, obj.tabSize || 2);

  //   commit("addTab", {
  //     title: "settings.json",
  //     path: `src/assets/settings.json`,
  //     monaco: {
  //       model: monaco.editor.createModel(string, "json"),
  //       state: null,
  //     },
  //   });
  // },
};

const getters = {
  uniqueUntitled: (state) => {
    const n = 1 + state.list.filter((t) => t.title.includes("untitled")).length;
    return `untitled_${n.toString().padStart(2, "0")}.jsx`;
  },

  tabByPath: (state) => (path) => state.list.find((tab) => tab.path === path),

  activeTab: (state, getters) => {
    const path = router.history.current.params;
    return getters.tabByPath(path);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
