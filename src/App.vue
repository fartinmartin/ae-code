<template>
  <div id="app">
    <bombino-panel>
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
    this.$router.push(this.tabs[0].title); // this doesnt work though...
  },
};
</script>
