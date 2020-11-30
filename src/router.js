import Vue from "vue";
import Router from "vue-router";
import MonacoEditor from "./components/MonacoEditor.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/:title?/:path?", // TODO: attach file path to route, this way i can validate settings.js for unique methods.. or something like that
      name: "edit",
      component: MonacoEditor,
      props: true,
    },
  ],
});
