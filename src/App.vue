<template>
  <div id="app">
    <bombino-panel>
      <monaco-editor v-model="code" :options="options" />
    </bombino-panel>
    <bombino-menus refresh debug />
  </div>
</template>

<script>
import { Menus, Panel } from "lokney";
import MonacoEditor from "./components/MonacoEditor";
import { keyEventInterests } from "./mixins/keyEventInterests";
import getFileContents from "./helpers/getFileContents";

const path = require("path");

export default {
  name: "App",

  mixins: [keyEventInterests],

  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "monaco-editor": MonacoEditor,
  },

  data: () => ({
    code: "",
    options: {
      fontSize: "16px",
      tabSize: "2",
    },
  }),

  async mounted() {
    this.code = await getFileContents(
      path.join(__dirname, `src/assets/examples/${this.$host.appName}.jsx`)
    );
  },
};
</script>
