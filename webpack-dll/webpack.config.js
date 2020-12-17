const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const addAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    // 将某个文件打包输出去并在html中自动引入该文件
    // add-asset-html-webpack-plugin 会将文件先复制到 dist 目录下
    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "./dll/jquery.js"),
      // 文件输出目录
      outputPath: "dll",
      // 脚本或链接标记的公共路径
      // 注意要加上这个前缀 否则在打包之后的index.html里面引入的脚本的前缀前面会自动加一个auto目录 导致我们的dll第三方包找不到
      publicPath: "dll"
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    // 告诉webpack哪些库不参与打包 同时使用时名称也得变
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dll/manifest.json")
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.js$/,
        use: [
          /**
           * 开启多进程打包 多进程有一定的开销
           * 进程启动大概需要600ms 进程通信也有一定的开销
           * 所以当打包花费时间较长时再使用多进程打包
           * 将thread-loader放在某一个loader的后面即数组中的前面
           * 那么将会对这个loader开启多进程打包
           */

          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }
    ]
  }
};
