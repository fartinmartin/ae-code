<template>
  <div :style="style" />
</template>

<script>
import * as monaco from "monaco-editor";

// const typeVersion = {
//   // https://github.com/pravdomil/types-for-adobe
//   // Animate: 2013,
//   AEFT: 2018,
//   AUDT: 2018,
//   IDSN: 2018,
//   ILST: 2015.3,
//   PHXS: 2015.5,
//   PPRO: 2018,
// };

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
      default: "javascript",
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
  }),

  computed: {
    style() {
      return {
        width: !/^\d+$/.test(this.width) ? this.width : `${this.width}px`,
        height: !/^\d+$/.test(this.height) ? this.height : `${this.height}px`,
      };
    },
    // hostApp() {
    //   return window.__adobe_cep__
    //     ? JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName
    //     : "browser";
    // },
    // rootPath() {
    //   return window.__adobe_cep__
    //     ? decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
    //         /file:\/{1,}/,
    //         ""
    //       )
    //     : "browser";
    // },
    // typesPath() {
    //   return `/node_modules/types-for-adobe/${this.hostApp}/${
    //     typeVersion[this.hostApp]
    //   }/index.d.ts`;
    // },
  },

  mounted() {
    this.initMonaco();
  },

  methods: {
    initMonaco() {
      const options = {
        // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
        value: this.value,
        theme: this.theme,
        language: this.language,
        ...this.options,
      };

      // compiler options
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES6,
        allowNonTsExtensions: true,
      });

      // extra libraries
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        [
          "declare class Facts {",
          "    /**",
          "     * Returns the next fact",
          "     */",
          "    static next():string",
          "}",
        ].join("\n"),
        "filename/facts.d.ts"
      );

      // ⚠️ https://github.com/Microsoft/monaco-editor/issues/61#issuecomment-236697130
      // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      //   // target: 1,
      //   allowNonTsExtensions: true,
      //   target: monaco.languages.typescript.ScriptTarget.CommonJS,
      //   noLib: true,
      //   allowJs: true,
      //   noEmit: true,
      // });

      // add adobe types
      // monaco.languages.typescript.javascriptDefaults.addExtraLib(
      //   this.typesPath, // need to get contents of file
      //   this.typesPath // optional file path eg: "types-for-adobe/AfterEffects/2018"
      // );

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

      console.log(this.editor._configuration);
    },

    // resize
  },

  beforeDestroy() {
    this.editor && this.editor.dispose();
  },
};
</script>
