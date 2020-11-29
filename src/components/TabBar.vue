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

<style scoped>
.tab-bar {
  --tab-text: #848484;
  --tab-text--active: #ffffff;
  --tab-text--hover: #848484;

  --tab-background: #1e1e1e;
  --tab-background--active: #1e1e1e;
  --tab-background--hover: #1e1e1e;

  --tab-border: #242424;
  --tab-border--active: #569cd6;
  --tab-border--hover: #242424;

  --tab-bar-background: #1e1e1e;
  --tab-bar-border: #242424;
}

.tab-bar {
  position: fixed;
  z-index: 1000;

  width: 100%;
  height: 2.25em;

  background-color: var(--tab-bar-background);
  border-bottom: 1px solid var(--tab-bar-border);

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
