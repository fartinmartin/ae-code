import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.config.devtools = false;

// is there a better way to learn about this API? can i extract a type.d.ts file or something?
// https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/CSInterface.js
Vue.prototype.$cep = window.__adobe_cep__;
Vue.prototype.$host = JSON.stringify(window.__adobe_cep__.getHostEnvironment());

new Vue({
  render: (h) => h(App),
}).$mount("#app");
