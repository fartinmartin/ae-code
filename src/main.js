import Vue from "vue";
import App from "./App.vue";
import { cep, compileCode, evalScript, host } from "./globals";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.prototype.$cep = cep;
Vue.prototype.$host = host;
Vue.prototype.$evalScript = evalScript;
Vue.prototype.$compileCode = compileCode;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
