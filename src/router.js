import Vue from "vue";
import Router from "vue-router";
import MonacoEditor from "./components/MonacoEditor.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/:title?/:path?",
      name: "edit",
      component: MonacoEditor,
      props: true,
    },
  ],
});
