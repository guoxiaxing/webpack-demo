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


// 另一个配置 可做参考


// 文件目录：configs/webpack.common.js
// 代码太长可以不看

// const path = require('path');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 顾名思义，把资源加到 html 里，那这个插件把 dll 加入到 index.html 里
// const webpack = require('webpack');
// module.exports = {
//   // ......
//   plugins: [
//     new webpack.DllReferencePlugin({
//       // 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
//       context: path.resolve(__dirname, '../'),
//       manifest: path.resolve(__dirname, '../dll/react.manifest.json'),
//     }),
//     new AddAssetHtmlPlugin({
//       filepath: path.resolve(__dirname, '../dll/_dll_react.js'),
//     }),
//   ]
// }


// 解放双手 autodll-webpack-plugin 不需要手动配置太多繁琐的东西

// 文件目录：configs/webpack.common.js

// const path = require('path');
// const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件

// module.exports = {
//   // ......
//   plugins: [
//         // 第 2 步：配置要打包为 dll 的文件
//         new AutoDllPlugin({
//             inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
//             filename: '[name].dll.js',
//             context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
//             entry: {
//                 react: [
//                     'react',
//                     'react-dom'
//                 ]
//             }
//         })
//   ]
// }




