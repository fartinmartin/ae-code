<template>
  <div id="app">
    <bombino-panel style="overflow: hidden;">
      <tab-bar />
      <router-view />
    </bombino-panel>
    <bombino-menus refresh debug />
  </div>
</template>

<script>
import { Menus, Panel } from "lokney";
import TabBar from "./components/TabBar.vue";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "tab-bar": TabBar,
  },

  computed: {
    ...mapState("tabs", { tabs: (state) => state.list }),
  },

  mounted() {
    // TODO: pull all state from LocalStorage 🤷‍♂️ (tab list, last active tab, etc)
    // is this the firstRun (via cookie or just localstorage?) then open a tab with the relevant JSX example and a tab for settings
  },
};
</script>
