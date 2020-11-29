import Vue from "vue";
import Router from "vue-router";
// import Edit from "./views/Edit.vue";
import MonacoEditor from "./components/MonacoEditor.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/:title?",
      name: "edit",
      // component: Edit,
      component: MonacoEditor,
      props: true,
    },
  ],
});
