const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  publicPath: "./",
  configureWebpack: {
    target: "node-webkit",
    node: false,
    plugins: [
      new MonacoWebpackPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["javascript", "typescript"],
      }),
    ],
  },
  lintOnSave: false,
};
