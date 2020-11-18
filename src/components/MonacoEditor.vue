<template>
  <div :style="style" />
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const fs = require("fs");
const path = require("path");

export default {
  props: {
    original: String,
    value: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "vs-dark",
    },
    language: {
      type: String,
      default: "typescript",
    },
    options: Object,
    diffEditor: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "100%",
    },
    height: {
      type: [String, Number],
      default: "100%",
    },
  },

  model: {
    event: "change",
  },

  data: () => ({
    editor: null, // will hold refernce to monaco editor instance
    host: null,
    types: {
      path: path.join(__dirname, "src/host/AEFT/index.d.ts"), // soon to be: `src/host/${this.host}/index.d.ts`
      definitions: "",
    },
  }),

  computed: {
    style() {
      return {
        width: this.width.match(/^\d+$/) ? `${this.width}px` : this.width,
        height: this.height.match(/^\d+$/) ? `${this.height}px` : this.height,
      };
    },
  },

  mounted() {
    this.host = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName;
    this.initMonaco();
  },

  methods: {
    getAdobeTypes() {
      return new Promise((resolve, reject) => {
        // read type definition file as a stream: https://stackoverflow.com/a/46801928
        const readStream = fs.createReadStream(this.types.path, "utf8");
        readStream.on("error", (error) => reject(error));
        readStream.on("data", (chunk) => (this.types.definitions += chunk));
        readStream.on("end", () => resolve(this.types.definitions));
      });
    },

    async initMonaco() {
      await this.getAdobeTypes();

      const options = {
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
        value: this.value,
        theme: this.theme,
        language: this.language,
        ...this.options,
      };

      // ⚠️ https://github.com/Microsoft/monaco-editor/issues/61#issuecomment-236697130
      // compiler options

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        noLib: true,
        allowNonTsExtensions: true,
        target: monaco.languages.typescript.ScriptTarget.CommonJS, // for adobe .jsx
        // target: 1,
        // allowJs: true,
        // noEmit: true,
      });

      // ⚠️ https://github.com/Microsoft/monaco-editor/issues/61#issuecomment-236697130
      // add adobe types

      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        this.types.definitions, // need to get contents of file
        this.types.path // optional file path eg: "types-for-adobe/AfterEffects/2018"
      );

      if (this.diffEditor) {
        this.editor = monaco.editor.createDiffEditor(this.$el, options);
        const originalModel = monaco.editor.createModel(
          this.original,
          this.language
        );
        const modifiedModel = monaco.editor.createModel(
          this.value,
          this.language
        );
        this.editor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
      } else {
        this.editor = monaco.editor.create(this.$el, options);
      }
    },

    // handle resize
  },

  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
};
</script>
