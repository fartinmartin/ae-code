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

const Babel = require("@babel/standalone");

export default {
  name: "App",

  mixins: [keyEventInterests],

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

  methods: {
    compileCode(code) {
      let output = Babel.transform(code, {
        presets: ["es2015"],
        plugins: [
          // https://babeljs.io/docs/en/plugins
          "transform-template-literals",
          "transform-block-scoping",
          "transform-arrow-functions",
        ],
      }).code;
      output = output.replace("const", "var");
      output = output.replace("let", "var");
      return output;
    },
  },
};
</script>
