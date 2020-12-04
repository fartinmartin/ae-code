<template>
  <div id="app">
    <bombino-panel style="overflow: hidden; padding: 0;">
      <tab-bar />
      <router-view />
      <status-bar />
    </bombino-panel>
    <bombino-menus refresh debug />
  </div>
</template>

<script>
import { Menus, Panel } from "lokney";
import TabBar from "./components/TabBar.vue";
import { mapState, mapGetters } from "vuex";
import StatusBar from "./components/StatusBar.vue";

export default {
  name: "App",

  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "tab-bar": TabBar,
    "status-bar": StatusBar,
  },

  computed: {
    ...mapState("tabs", {
      tabs: (state) => state.list,
      prev: (state) => state.previous.activeTab,
    }),

    tab() {
      return this.tabs[0];
    },
  },

  mounted() {
    this.$router.push({ name: "edit", params: { path: this.tab.path } });

    window.onbeforeunload = (e) => {
      e.preventDefault(); // suppress dialog
      // this.$store.dispatch("tabs/savePrevious");
    };

    // TODO: pull all state from localStorage (user settings, tab list, prev active tab, etc)
    // this.$store.dispatch("settings/deleteSettings");
    // this.$store.dispatch("tabs/deletePrevious");
    // this.$store.dispatch("tabs/getPrevious");
    this.$store.dispatch("settings/getSettings");
    this.$store.dispatch("tabs/getModels");
    // this.$store.dispatch("tabs/openFile");

    // set active tab to previous session's active tab
    // if (this.$route.params.path !== this.prev.path)
    // this.$router.push({ name: "edit", params: { path: this.tab.path } }); // (could it be this simple? its an object w extra properties but should still work right?)
    // this.$router.push({ path: this.prev.path });
    // this.$store.dispatch("tabs/createSettingsTab"); // could be behind a is first run? check 🤷‍♂️
    // this.$store.dispatch("tabs/createExampleTab"); // could be behind a is first run? check 🤷‍♂️
  },
};
</script>
