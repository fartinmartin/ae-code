import Vue from "vue";
import App from "./App.vue";

const Babel = require("@babel/standalone");

Vue.config.productionTip = false;
Vue.config.devtools = false;

// is there a better way to learn about this API? can i extract a type.d.ts file or something?
// https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/CSInterface.js OR ../public/CSInterface.js
Vue.prototype.$cep = window.__adobe_cep__;
Vue.prototype.$host = JSON.parse(window.__adobe_cep__.getHostEnvironment());

// ⚠️ TODO: VISIBLE/USABLE CONSOLE IN PANEL UI instead of alert-ing errors via AE UI
Vue.prototype.$evalScript = function(code, callback = () => {}) {
  window.__adobe_cep__.evalScript(
    `try{ ${this.$compileCode(
      code
    )} } catch(err) { alert(err.line.toString() + ": " + err.toString()) }`,
    callback
  );
};

Vue.prototype.$compileCode = (code) => {
  const EOSmsg = `// Adobe programs won't run your script if it ends in a comment... \n// So, just in case your code DOES end in a comment, here's a dummy var to end your script: \nvar endOfScript;`;
  return Babel.transform(code + EOSmsg, {
    presets: ["es2015"],
    plugins: [
      // https://babeljs.io/docs/en/plugins
      "transform-template-literals",
      "transform-block-scoping",
      "transform-arrow-functions",
    ],
  }).code;
};

new Vue({
  render: (h) => h(App),
}).$mount("#app");
