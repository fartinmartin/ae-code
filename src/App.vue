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

// TODO: tabs? https://github.com/Microsoft/monaco-editor/issues/604#issuecomment-344214706

export default {
  name: "App",
  components: {
    "bombino-menus": Menus,
    "bombino-panel": Panel,
    "monaco-editor": MonacoEditor,
  },
  data: () => ({
    code: "const noop = () => {};",
    language: "javascript",
    options: {
      fontSize: "16px",
      tabSize: "2",
    },
  }),
};
</script>
