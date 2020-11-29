<template>
  <div :style="style" />
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { mapGetters, mapState } from "vuex";
import getFileContents from "../helpers/getFileContents";

const path = require("path"); // https://shapeshed.com/writing-cross-platform-node/#use-the-os-module-for-more-control

export default {
  name: "MonacoEditor",

  props: {
    language: {
      type: String,
      default: "javascript",
    },

    title: String, // comes from router.js
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

  computed: {
    ...mapGetters("settings", ["settings"]),
    ...mapGetters("tabs", ["initialTab"]),

    ...mapState("tabs", { tabs: (state) => state.list }),

    tab() {
      const activeTab = this.tabs.find((tab) => tab.title === this.title);
      return activeTab ? activeTab.monaco : this.initialTab.monaco;
    },

    style() {
      return `width: 100%; height: calc(100% - 2.25em); margin-top: 2.25em; font-size: ${this.settings.fontSize};`; // not sold on 2.275em, i think tabbar needs an explicit height (set in ems) and its contents dispersed through that height...
    },
  },

  mounted() {
    this.initMonaco();
  },

  methods: {
    async initMonaco() {
      this.types.definitions = await getFileContents(this.types.path);

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

      this.editor = monaco.editor.create(this.$el, this.settings);
      this.editor.getModel().updateOptions({ tabSize: this.settings.tabSize });

      this.editor.setModel(this.tab.model); // inits the active tab (for first time start up aka when no route is navigated to via a tab click)
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
    saveFile() {},

    // TODO: TABS ACTIONS
    // should start by building this functionality within <tab-bar />, i think

    addTab() {
      /* 1. add tab to vuex store 2. push new tab to $router */
    },

    closeTab() {
      /* 1. remove tab from vuex store 2. push prev tab (tabs[tabs.indexOf(thisTab-1)]) to $router */
    },
  },

  watch: {
    tab(tab, prevTab) {
      if (!this.editor) return;
      prevTab.state = this.editor.saveViewState();
      this.editor.setModel(tab.model);
      this.editor.restoreViewState(tab.state);
      this.editor.focus();
    },
  },

  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
};
</script>
