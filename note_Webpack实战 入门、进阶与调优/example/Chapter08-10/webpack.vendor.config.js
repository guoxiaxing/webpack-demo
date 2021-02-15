const path = require("path");
const webpack = require("webpack");
const dllAssetPath = path.join(__dirname, "dll");
const dllLibaryName = "dllExample";
module.exports = {
  // 指定将哪些文件打包成vendor
  entry: ["react"],
  output: {
    path: dllAssetPath,
    filename: "vendor.js",
    library: dllLibaryName
  },
  plugins: [
    new webpack.DllPlugin({
      // 导出的 dll library 的名字，需要和output.library保持一致
      name: dllLibaryName,
      // 资源清单的绝对路径，业务打包时会根据这个清单进行模块索引
      path: path.join(dllAssetPath, "manifest.json")
    })
  ],
  mode: "development"
};
