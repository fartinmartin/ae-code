<template>
  <div id="app">
    <bombino-panel>
      <monaco-editor v-model="code" :options="{ fontSize: '16px' }" />
      <!-- <monaco-editor
        ref="editor"
        width="800"
        height="500"
        theme="vs-dark"
        v-model="code"
        :language="language"
        :options="options"
      /> -->
    </bombino-panel>
    <bombino-menus refresh debug />
  </div>
</template>

<script>
import { Menus, Panel } from "lokney";
import MonacoEditor from "./components/MonacoEditor";

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
      scrollBeyondLastLine: false,
      lineNumbersMinChars: 4,
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true,
    },
  }),
};
</script>
