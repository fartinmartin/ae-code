<template>
  <div :style="style" />
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const fs = require("fs");
const path = require("path");

export default {
  props: {
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
      default: "javascript",
    },
    options: Object,
    original: String,
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
        // any option from: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
        // ...plus `tabSize`, added so that user could edit 👉 tabSize is updated via `getModel().updateOptions()`: https://github.com/microsoft/monaco-editor/issues/1859

        // required
        value: this.value,
        theme: this.theme,
        language: this.language,

        // opinionated defaults
        tabSize: 4, // see note above
        scrollBeyondLastLine: false,
        lineNumbersMinChars: 4,
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,

        // user defined
        ...this.options,
      };

      // ⚠️ https://github.com/Microsoft/monaco-editor/issues/61#issuecomment-236697130
      // compiler options

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        noLib: true, // remove all hints/auto-completions (no need for HTML hints etc.)
        allowNonTsExtensions: true, // at hints to .js files!
        target: monaco.languages.typescript.ScriptTarget.CommonJS, // for adobe .jsx
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

      this.editor.getModel().updateOptions({ tabSize: this.options.tabSize });
    },

    // TODO: TABS (including a everpresent options/settings tab, or maybe it is accessivle via context menu)
    // https://github.com/Microsoft/monaco-editor/issues/604#issuecomment-344214706
    // also, where do we want to store tabs? both literally (as data) and as state 🤔

    // addTab() {
    //   // const tab = monaco.editor.createModel(...);
    //   // this.switchTab(tab);
    // },

    // closeTab() {
    //   // editorInstance.saveViewState();
    //   // this.switchTab(this.tabs[0]) or something...
    // },

    // switchTab() {
    //   // editorInstance.setModel(modelInstance)
    //   // editorInstance.restoreViewState()
    // },

    // TODO: EVENTS
    // handle window resize
    // listen for `del` keypress
    // set shortcut for formating (maybe just change the defaul, it is already in context menu)
    // cmd + enter = run this code
    // cmd + s = save to file
    // cmd + r = reload extension?

    // TODO: FILESYSTEM STUFF

    // compileCode() {
    //   // return compiledCode;
    // },

    // saveFile() {
    //   // data = this.compileCode();
    //   fs.writeFile(this.fileName, this.code, (error) => {
    //     error && console.log(error);
    //     console.log("[ae-code] File saved!");
    //   });
    // },
  },

  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
};
</script>
