const path = require("path");
const DonePlugin = require("./plugins/DonePlugin");
const CompilationPlugin = require("./plugins/CompilationPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [new DonePlugin(), new CompilationPlugin()]
};
