const Babel = require("@babel/standalone");

export const cep = window.__adobe_cep__;
export const host = JSON.parse(window.__adobe_cep__.getHostEnvironment());

export function evalScript(code, callback = () => {}) {
  console.log(this.$compileCode(code));
  window.__adobe_cep__.evalScript(
    `try{ ${this.$compileCode(
      code
    )} } catch(err) { alert(err.line.toString() + ": " + err.toString()) }`,
    callback
  );
}

export function compileCode(code) {
  const EOSmsg = `// \n // \n // \n // ⚠️\n // Adobe programs won't run your script if it ends in a comment... \n// So, just in case your code DOES end in a comment, here's a dummy var to end your script: \nvar endOfScript${Date.now()};`;
  return Babel.transform(code + EOSmsg, {
    presets: ["es2015"],
    plugins: [
      // https://babeljs.io/docs/en/plugins
      "transform-template-literals",
      "transform-block-scoping",
      "transform-arrow-functions",
    ],
  }).code;
}
