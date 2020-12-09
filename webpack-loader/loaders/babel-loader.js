// 之前我们使用 babel-loader 的时候  也需要安装 @babel/core 是因为 babel 的代码转换是依赖于 @babel/core 实现的
const babel = require("@babel/core");
const utils = require("loader-utils");
function loader(source) {
  // 需要根据我们babel-loader传递过来的参数进行转换
  // 使用 loader-utils 来 获取给loader
  // loader 里面有一个关键字this 他就是 loader 的上下文
  const options = utils.getOptions(this);
  // 异步执行
  const cb = this.async();
  babel.transform(
    source,
    {
      presets: options.presets,
      sourceMap: true,
      // 给 sourceMap 文件指定一个文件名
      filename: this.resourcePath.split("/").pop()
    },
    function(err, result) {
      cb(err, result.code, result.map);
    }
  );
}

module.exports = loader;
