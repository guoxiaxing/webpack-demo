/**
 * 使用了splitChunks 的时候 会将文件中node_modules中导入的包都打包在同一个chunk文件中
 * 会导致文件体积过大 使用dll 动态链接库 可以将我们的第三方模块单独打包成chunk文件
 */
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    // 最终打包生产的chunk文件中的[name]是jquery
    // ["jquery"] 表示要打包的第三方库是jquery
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: "[name]_[hash:8]" // 打包的库里面向外暴露出去的名字叫什么
  },
  // 前面的entry和output选项都是用来配置打包jquery的
  plugins: [
    new webpack.DllPlugin({
      // 生成一个 manifest.json 文件 提供和jquery的映射
      name: "[name]_[hash:8]", // 映射的库暴露的名称 和 library 一致
      path: path.resolve(__dirname, "dll/manifest.json") // 输出的文件路径
    })
  ],
  mode: "production"
};
