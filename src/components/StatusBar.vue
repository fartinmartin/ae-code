<template>
  <div class="status-bar" :style="style">
    <span>path: {{ this.$route.params.path }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatusBar",

  computed: {
    ...mapGetters("settings", ["settings"]),

    style() {
      return `font-size: ${this.settings.fontSize}; background: ${this.settings.colors.statusBarBackground};`;
    },
  },
};
</script>

<style>
.status-bar {
  height: 1.5em;
  width: 100%;
  background: #000;
  /* position: absolute;
  bottom: 0; */
  padding: 0.125em;
  display: flex;
  align-items: center;
}

.status-bar * {
  margin: 0;
  padding: 0;
  font-size: 0.75em;
}
</style>
