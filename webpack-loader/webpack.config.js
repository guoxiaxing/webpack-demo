const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolveLoader: {
    // 其实loader就是一个模块 所以 先去node_modules下去找 找不到时去到我们自定义的目录中去找
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
    // alias: {
    //   loader1: path.resolve(__dirname, "loaders", "loader1.js")
    // }
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.png$/,
        // 根据图片生成一个md5时间戳 发射到 dist 目录下 file-loader还会返回当前图片路径
        // use: ["file-loader"]
        // url-loader 用来处理路径 然后交给 file-loader 它会将文件发射出来
        use: {
          loader: "url-loader",
          options: {
            limit: 20 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "Webpack Loader",
            filename: path.resolve(__dirname, "banner.js")
          }
        }
      }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"]
      //     }
      //   }
      // }
      // 单个loader
      // {
      //   test: /\.js$/,
      //   // 使用自定义loader的方式
      //   // 1. 使用绝对路径
      //   // use: [path.resolve(__dirname, "loaders", "loader1.js")]
      //   // 2. 配置resolveLoader选项
      //   use: ["loader1"]
      // }
      // 多个loader的配置
      // {
      //   test: /\.js$/,
      //   // 从右向左执行
      //   use: ["loader3", "loader2", "loader1"]
      // }
      // 从下向上执行
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader3"
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader2"
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader1"
      //   }
      // }
      // loader的分类
      // pre 在前面的
      // post 在后面的
      // normal
      // loader的顺序 pre -- normal --- inline(行内) --- post
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader1"
      //   },
      //   enforce: "pre"
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader2"
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "loader3"
      //   },
      //   enforce: "post"
      // }
    ]
  }
};
