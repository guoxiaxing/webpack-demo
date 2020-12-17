const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    new MiniCssExtractPlugin({
      filename: "main.css"
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
