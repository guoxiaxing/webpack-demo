const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const workboxWebpackPlugin = require("workbox-webpack-plugin");

/**
 * 利用workbox-webpack-plugin 插件实现 pwa 的功能
 * serviceWorker的代码必须运行在服务器上 所以 我们需要在dist目录下启一个服务
 * cd dist
 * http-server
 * 然后在 http://127.0.0.1:8080 就可以看到serviceWorker成功被启动
 */
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
    }),
    // 该插件会帮助我们生成一个serviceWorker的配置文件
    new workboxWebpackPlugin.GenerateSW({
      /**
       * 帮助serviceWorker快速启动
       * 删除旧的serviceWorker
       */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
};
