const path = require("path");
//  插件
class P {
  apply(compiler) {
    console.log("P plugin", compiler);
    compiler.hooks.emit.tap("emit", () => {
      console.log("emit");
    });
  }
}
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, "loader", "style-loader"),
          path.resolve(__dirname, "loader", "less-loader")
        ]
      }
    ]
  },
  plugins: [new P()]
};
