<template>
  <div id="app">
    <bombino-panel>
      <tab-bar />
      <monaco-editor v-model="code" />
    </bombino-panel>
    <bombino-menus refresh debug />
  </div>
</template>

<script>
import { Menus, Panel } from "lokney";
import MonacoEditor from "./components/MonacoEditor";
import TabBar from "./components/TabBar.vue";

import getFileContents from "./helpers/getFileContents";
// import { keyEventInterests } from "./mixins/keyEventInterests";

const path = require("path");

export default {
  name: "App",

  // mixins: [keyEventInterests], // doesn't work?

  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "monaco-editor": MonacoEditor,
    "tab-bar": TabBar,
  },

  data: () => ({
    code: "",
  }),

  async mounted() {
    this.code = await getFileContents(
      path.join(__dirname, `src/assets/examples/${this.$host.appName}.jsx`)
    );
  },
};
</script>
