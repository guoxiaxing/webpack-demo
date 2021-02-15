const path = require("path");
const HappyPack = require("happypack");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
    chunkFilename: "[name].js"
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "babel-loader",
      //   options: {
      //     presets: ["@babel/preset-env"]
      //   },
      //   exclude: /node_modules/
      // }
      // 单个loader
      // {
      //   test: /\.js$/,
      //   loader: "happypack/loader",
      //   exclude: /node_modules/
      // }
      // 多个loader
      {
        test: /\.js$/,
        use: ["happypack/loader?id=babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: ["happypack/loader?id=ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 单个loader
    // new HappyPack({
    //   loaders: [
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["@babel/preset-env"]
    //       }
    //     }
    //   ]
    // })
    // 多个loader
    new HappyPack({
      id: "babel-loader",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      ]
    }),
    new HappyPack({
      id: "ts-loader",
      loaders: ["ts-loader"]
    }),
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, "dll/manifest.json")
    })
  ],
  mode: "development"
};
