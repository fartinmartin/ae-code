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
    // TODO: pull all state from localStorage (user settings ✅, tab list, last active tab, etc)
    this.$store.dispatch("settings/getSettings");
    this.$store.dispatch("tabs/getModels");
    this.$store.dispatch("tabs/createSettingsTab"); // could be behind a is first run? check 🤷‍♂️
    // this.$store.dispatch("tabs/createExampleTab"); // could be behind a is first run? check 🤷‍♂️

    // on cold start, make sure route is synced with displayed tab!
    if (this.$route.params.path !== this.initialTab.path) {
      this.$router.push({
        params: { title: this.initialTab.title, path: this.initialTab.path },
      });
    }
  },
};
</script>
