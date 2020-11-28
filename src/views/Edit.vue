<template>
  <div style="height: 100vh;">
    <tab-bar />
    <monaco-editor v-model="code" />
  </div>
</template>

<script>
import MonacoEditor from "../components/MonacoEditor";
import TabBar from "../components/TabBar.vue";

import getFileContents from "../helpers/getFileContents";
const path = require("path");

export default {
  name: "Edit",

  components: {
    "monaco-editor": MonacoEditor,
    "tab-bar": TabBar,
  },

  data: () => ({
    code: "", // figure out way to make code reliant on params
  }),

  async mounted() {
    this.code = await getFileContents(
      path.join(__dirname, `src/assets/examples/${this.$host.appName}.jsx`)
    );
  },
};
</script>

<style></style>
