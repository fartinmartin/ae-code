import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// const path = require("path");
// import { host } from "../globals";

const state = {
  list: [
    {
      title: "sayHi",
      monaco: {
        model: monaco.editor.createModel(
          `\n\n\n\n\n\n\n\n\n\n\n\nconst sayHi = () => alert("hi");\nsayHi();`,
          "javascript"
        ),
        state: null,
      },
    },
    {
      title: "sayBye",
      monaco: {
        model: monaco.editor.createModel(
          `\n\n\n\n\n\n\n\n\n\n\n\nconst sayBye = () => alert("bye");\nsayBye();`,
          "javascript"
        ),
        state: null,
      },
    },
  ],
};

const mutations = {};

const actions = {};

const getters = {
  initialTab: (state) =>
    localStorage.getItem("lastActiveTab") /* .title */ || state.list[0].title,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
