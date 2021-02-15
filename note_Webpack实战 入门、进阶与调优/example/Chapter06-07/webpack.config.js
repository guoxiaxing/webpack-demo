const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// 这个插件不能将html中的样式（style标签内的）提取出来，这个提取值得是将css样式从我们打包后的js文件中提取出来

// 以前我们都是将css 打包到 js 中，然后通过 sytle-loader 在页面中生成style 标签，

// 现在我们想让我们的css 样式单独提取出来，然后引入到目标页面中！

// 之前我们打包css时，需要在js文件中import这个css文件才可以，但是这个会导致我们的css是和js打包到同一个bundle中

// mini-css-extract-plugin 可以帮助我们提取css到单独的文件，默认是main.css

// const miniCss = require("mini-css-extract-plugin");
// 对提取出来的css文件进行压缩
// const optimizeCss = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle@[chunkhash].js",
    publicPath: "/dist/",
    chunkFilename: "[name].js"
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [miniCss.loader, "css-loader"]
  //     }
  //   ]
  // },
  // 可以直接使用 optimize-css-assets-webpack-plugin 插件就可以达到压缩css的目的
  // plugins: [new miniCss(), new optimizeCss()],
  devServer: {
    port: 8000,
    publicPath: "/dist/"
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new Analyzer()
    // 以一个html为模版生成新的html
    // new HtmlWebpackPlugin({
    //   template: "./index.html"
    // })
  ],
  // devtool: "source-map",
  mode: "development"
};
