<template>
  <div id="app">
    <bombino-panel style="overflow: hidden; padding: 0;">
      <tab-bar />
      <router-view />
      <!-- TODO: <div>resources mini menu</div> -->
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
    ...mapState("tabs", {
      tabs: (state) => state.list,
      prev: (state) => state.session.activeTab,
    }),
  },

  mounted() {
    window.onbeforeunload = (e) => {
      e.preventDefault(); // suppress dialog
      this.$store.dispatch("tabs/saveSession");
    };

    // TODO: pull all state from localStorage (user settings, tab list, prev active tab, etc)
    this.$store.dispatch("settings/deleteSettings");
    this.$store.dispatch("settings/getSettings");
    this.$store.dispatch("tabs/getSession");
    this.$store.dispatch("tabs/getModels");
    // this.$store.dispatch("tabs/openFile");

    // set active tab to previous session's active tab
    if (this.$route.params.path !== this.prev.path)
      // this.$router.push(this.prev); (could it be this simple? its an object w extra properties but should still work right?)
      this.$router.push({
        title: this.prev.title,
        path: this.prev.path,
      });
    // this.$store.dispatch("tabs/createSettingsTab"); // could be behind a is first run? check 🤷‍♂️
    // this.$store.dispatch("tabs/createExampleTab"); // could be behind a is first run? check 🤷‍♂️
  },
};
</script>
