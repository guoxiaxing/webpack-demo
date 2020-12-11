const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./plugins/FileListPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineSourcePlugin = require("./plugins/InlineSourcePlugin");
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
    new FileListPlugin({
      filename: "list.md"
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    new InlineSourcePlugin({
      match: /\.(js|css)$/
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
