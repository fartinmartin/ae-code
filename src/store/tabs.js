const state = {
  list: [
    {
      id: 1,
      title: "example",
      path: "",
      code: `const sayHi = () => alert("hi");\nsayHi();`,
    },
    {
      id: 2,
      title: "settings",
      path: "",
      code: `const sayHi = () => alert("hi");\nsayHi();`,
    },
    {
      id: 3,
      title: "sayHi",
      path: "",
      code: `const sayHi = () => alert("hi");\nsayHi();`,
    },
  ],
};

const mutations = {};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
