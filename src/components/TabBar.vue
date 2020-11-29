<template>
  <div class="tab-bar" :style="style">
    <div class="scrollable-container">
      <div class="tabs">
        <router-tab
          v-for="tab in tabs"
          :key="tab.id"
          :to="tab.title"
          :tab="tab"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "./Tab";
import { mapState, mapGetters } from "vuex";

export default {
  name: "TabBar",

  components: {
    "router-tab": Tab,
  },

  computed: {
    ...mapState("tabs", { tabs: (state) => state.list }),
    ...mapGetters("settings", ["settings"]),
    style() {
      return `font-size: ${this.settings.fontSize};`;
    },
  },
};
</script>

<style>
:root {
  --text: #fff;
  --text-inactive: #848484;

  --bg: rgb(21, 21, 21);

  --border: rgb(36, 36, 36);
  --border-active: #6cc7f6;

  color: var(--text);
  background: var(--bg);
}

.panel {
  padding: 0 !important;
}
</style>

<style scoped>
.tab-bar {
  position: fixed;
  z-index: 1000;

  width: 100%;
  height: 2.25em;

  background-color: #1e1e1e;
  border-bottom: 1px solid var(--border);

  font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI",
    "HelveticaNeue-Light", system-ui, "Ubuntu", "Droid Sans", sans-serif !important;
  font-weight: 500;
}

.scrollable-container {
  position: relative;
  overflow: scroll;

  scrollbar-width: none;
}

.scrollable-container::-webkit-scrollbar {
  display: none;
}

.scrollable-container,
.tabs {
  height: 100%;
  display: flex;
}
</style>
