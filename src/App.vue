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
import { mapGetters, mapState } from "vuex";

export default {
  name: "App",

  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "tab-bar": TabBar,
  },

  computed: {
    ...mapState("tabs", { tabs: (state) => state.list }),
    ...mapGetters("tabs", ["initialTab"]),
  },

  mounted() {
    // on cold start, make sure route is synced with displayed tab!
    this.$route.params.title !== this.initialTab &&
      this.$router.push({ path: this.initialTab });

    // TODO: pull all state from LocalStorage 🤷‍♂️ (tab list, last active tab, etc)
    // is this the firstRun (via cookie or just localstorage?) then open a tab with the relevant JSX example and a tab for settings
  },
};
</script>
