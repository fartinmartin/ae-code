<template>
  <monaco-editor :tab="tab.monaco" />
</template>

<script>
import MonacoEditor from "../components/MonacoEditor";
import { mapState } from "vuex";

// TODO: this router view could just be the MonacoEditor.vue component...

export default {
  name: "Edit",

  props: {
    title: String,
  },

  components: {
    "monaco-editor": MonacoEditor,
  },

  computed: {
    ...mapState("tabs", { tabs: (state) => state.list }),
    tab() {
      return this.tabs.find((tab) => tab.title === this.title);
    },
  },
};
</script>
