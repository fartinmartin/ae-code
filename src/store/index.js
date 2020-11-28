import Vue from "vue";
import Vuex from "vuex";
import settings from "./settings";
Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
    },
    strict: process.env.DEV, // enable strict mode (adds overhead!) for dev mode only
  });

  return Store;
}
