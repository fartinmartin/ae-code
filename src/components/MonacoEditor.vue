<template>
  <div style="width: 100%; height: 100%;" />
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import getFileContents from "../helpers/getFileContents";

const fs = require("fs");
const path = require("path"); // https://shapeshed.com/writing-cross-platform-node/#use-the-os-module-for-more-control

export default {
  name: "MonacoEditor",

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

  data() {
    return {
      editor: null, // will hold refernce to monaco editor instance
      types: {
        path: path.join(__dirname, `src/host/${this.$host.appName}/index.d.ts`),
        definitions: "",
      },
    };
  },

  mounted() {
    this.initMonaco();
  },

  methods: {
    async initMonaco() {
      this.types.definitions = await getFileContents(this.types.path);

      const options = {
        // any option from: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
        // ...plus `tabSize`, added so that user could edit 👉 tabSize is updated via `getModel().updateOptions()`: https://github.com/microsoft/monaco-editor/issues/1859

        // required
        value: this.value,
        theme: this.theme,
        language: this.language,
        automaticLayout: true, // this is how monaco handles responsiveness/resizing

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
        allowNonTsExtensions: true, // add ts hints to .js files!
        target: monaco.languages.typescript.ScriptTarget.CommonJS, // for adobe .jsx, i am assuming this is only necessary if setting language to typescript (otherwise we are compiling with babel in main.js)
      });

      // ⚠️ https://github.com/Microsoft/monaco-editor/issues/61#issuecomment-236697130
      // add adobe types

      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        this.types.definitions, // need to get contents of file
        this.types.path // optional file path eg: "types-for-adobe/AfterEffects/2018"
      );

      this.editor = monaco.editor.create(this.$el, options);
      this.editor.getModel().updateOptions({ tabSize: options.tabSize });

      this.addActions();
    },

    // TODO: CUSTOM ACTIONS/COMMANDS VIA addAction/addCommand
    // https://github.com/Microsoft/monaco-editor/issues/25

    addActions() {
      // https://github.com/microsoft/monaco-editor/blob/d2028b1a7551c788432fee27de8dc8262ddb1c2b/monaco.d.ts#L1045
      // ⚠️ should (some of) these should also go in the <bombino-menu /> component?
      // after i figure out tabs: {
      //   options/settings,
      //   save,
      //   save-as,
      //   open file,
      //   close file,
      //   new file,
      //   next tab,
      //   prev tab,
      // }
      this.editor.addAction({
        id: "run-code",
        label: "Run Code",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        contextMenuGroupId: "action",
        contextMenuOrder: 1.1,
        run: (ed) => this.$evalScript(ed.getValue()),
      });

      this.editor.addAction({
        id: "run-selected-code",
        label: "Run Selected Code",
        precondition: "editorHasSelection",
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.Enter],
        contextMenuGroupId: "action",
        contextMenuOrder: 1.2,
        run: (ed) =>
          this.$evalScript(ed.getModel().getValueInRange(ed.getSelection())),
      });

      this.editor.addAction({
        id: "reload-panel",
        label: "Reload Panel",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_R],
        contextMenuGroupId: "meta",
        contextMenuOrder: 2.1,
        run: () => location.reload(),
      });
    },

    // TODO: FILESYSTEM STUFF
    saveFile() {
      // data = this.compileCode();
      fs.writeFile(this.fileName, this.code, (error) => {
        error && console.log(error);
        console.log("[ae-code] File saved!");
      });
    },

    // TODO: TABS (including an ever-present options/settings tab, or maybe it is accessivle via context menu)
    // https://github.com/Microsoft/monaco-editor/issues/604#issuecomment-344214706
    // also, where do we want to store tabs? both literally (as data) and as state 🤔
    // i think this should live in a <tab-bar/> component in App.vue and should emit the changes
    // for this.editor to react to and change the model (or, instead of models, do we simplify and just swap this.code data 🤔)

    addTab() {
      // const tab = monaco.editor.createModel(...);
      // this.switchTab(tab);
    },

    closeTab() {
      // editorInstance.saveViewState();
      // this.switchTab(this.tabs[0]) or something...
    },

    switchTab() {
      // editorInstance.setModel(modelInstance)
      // editorInstance.restoreViewState()
    },
  },

  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
};
</script>
