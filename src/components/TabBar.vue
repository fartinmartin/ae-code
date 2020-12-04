<template>
  <div class="tab-bar" :style="fontSize + colors">
    <div class="scrollable-container">
      <div class="tabs">
        <router-tab
          v-for="tab in tabs"
          :key="tab.id"
          :to="{ name: 'edit', params: { path: tab.path } }"
          :tab="tab"
        />
        <button class="tab" @click="addTab">+</button>
      </div>
      <!-- TODO: minimal scrollbar <div class="scrollbar"></div> -->
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

    fontSize() {
      return `font-size: ${this.settings.fontSize};`;
    },

    colors() {
      let colors = "";
      const toKebabCase = (k, v) =>
        `--${k.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}: ${v};`;
      for (const [key, value] of Object.entries(this.settings.colors)) {
        colors = colors + toKebabCase(key, value);
      }
      return colors;
    },
  },

  methods: {
    addTab() {
      this.$store.dispatch("tabs/addTab");
    },
  },
};
</script>

<style>
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

button.tab {
  padding-right: 1em;
  color: var(--tab-text);
}

button.tab:hover {
  color: var(--tab-text-active);
}
</style>

<style scoped>
.scrollbar {
  position: absolute;
  left: 0px;
  bottom: 0px;

  height: 3px;
  z-index: 50;
}

.slider {
  contain: strict;
  position: absolute;
  height: 3px;
  top: 0px;
  left: 47px; /* dynamic: on horizontal scroll => left = scrollX? */
  width: 778px; /* dynamic: width of .tabs / width of .scrollable-container ? */
}
</style>
