import Vue from "vue";
import Vuex from "vuex";
import settings from "./settings";
import tabs from "./tabs";
Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
      tabs,
    },
    strict: process.env.DEV, // enable strict mode (adds overhead!) for dev mode only
  });

  return Store;
}
