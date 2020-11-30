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
    // on cold start, make sure route is synced with displayed tab!
    if (this.$route.params.path !== this.initialTab.path) {
      this.$router.push({
        params: { title: this.initialTab.title, path: this.initialTab.path },
      });
    }

    this.$store.dispatch("tabs/getModels");

    // TODO: pull all state from LocalStorage 🤷‍♂️ (tab list, last active tab, etc)
    // is this the firstRun (via cookie or just localstorage?) then open a tab with the relevant JSX example and a tab for settings
  },
};
</script>
