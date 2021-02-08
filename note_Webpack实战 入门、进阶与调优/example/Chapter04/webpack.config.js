const path = require("path");
// const MiniExtractWebpackPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
    // publicPath: "./assets/"
  },
  // 与loader相关的配置都在 module.rules 中
  module: {
    rules: [
      //   {
      //     // test 接受的是一个正则表达式，只有被正则表达式匹配上的文件才会应用这些loader
      //     test: /\.css$/,
      //     // use 接受一个数组，表示为这个文件所使用的所有loader
      //     // css-loader 仅仅处理的是 css 中的加载语法 @import 以及 url() 函数等
      //     // 如果想让样式起作用，还需要使用style-loader在页面中插入样式
      //     use: [
      //       "style-loader",
      //       {
      //         loader: "css-loader",
      //         options: {
      //           // 配置项
      //         }
      //       }
      //     ],
      //     exclude: /node_modules/
      //   },
      //   {
      //     test: /\.js$/,
      //     use: [
      //       {
      //         loader: "babel-loader",
      //         options: {
      //           cacheDirectory: true,
      //           //   presets: ["@babel/preset-env"]
      //           presets: [
      //             [
      //               "@babel/preset-env",
      //               {
      //                 modules: false
      //               }
      //             ]
      //           ]
      //         }
      //       }
      //     ]
      //     // exclude: "node_modules"
      //   },
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      //   {
      //     test: /\.(jpg|png|gif)$/,
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       // 这个publicPath会覆盖output中的
      //       publicPath: "./images/"
      //     }
      //   }
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10240000,
          name: "[name].[ext]",
          // 这个publicPath会覆盖output中的
          publicPath: "./images/"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          },
          "postcss-loader"
        ]
      }
      //   {
      //     test: /\.css$/,
      //     use: [MiniExtractWebpackPlugin.loader, "css-loader"]
      //   },
      //   {
      //     test: /\.scss$/,
      //     use: [
      //       "style-loader",
      //       {
      //         loader: "css-loader",
      //         options: {
      //           sourceMap: true
      //         }
      //       },
      //       {
      //         loader: "sass-loader",
      //         options: {
      //           sourceMap: true
      //         }
      //       }
      //     ]
      //   }
      //   {
      //     test: /\.js$/,
      //     loader: path.resolve(__dirname, "loaders", "force-strict-loader"),
      //     options: {
      //       sourceMap: true
      //     },
      //     exclude: /node_modules/
      //   }
    ]
  },
  devServer: {
    port: 8000,
    publicPath: "/dist/"
  },
  mode: "development",
  plugins: [
    // new MiniExtractWebpackPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // })
  ]
};
