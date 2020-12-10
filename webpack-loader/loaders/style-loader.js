const loaderUtils = require("loader-utils");
function loader(source) {
  // 需要导出一个脚本 可以直接执行
  const style = `
      const style = document.createElement('style');
      // JSON.stringify(source) 是为了去除换行
      style.innerHTML = ${JSON.stringify(source)};
      document.head.appendChild(style);
    `;
  return style;
}
// 只要在loader上写了 pitch 那么后面的 loader 都不走了
// style-loader css-loader less-loader
loader.pitch = function(remainingRequest) {
  // /Users/guoxx03/Desktop/test/webpack-demo/webpack-loader/loaders/css-loader.js!/Users/guoxx03/Desktop/test/webpack-demo/webpack-loader/loaders/less-loader.js!/Users/guoxx03/Desktop/test/webpack-demo/webpack-loader/src/index.less
  // css-loader!less-loader!index.less
  const str = `
        const style = document.createElement('style');
        // JSON.stringify(source) 是为了去除换行
        // stringifyRequest 将绝对路径转化为相对路径
        style.innerHTML = require(${loaderUtils.stringifyRequest(
          this,
          "!!" + remainingRequest
        )});
        document.head.appendChild(style);
      `;
  return str;
};
module.exports = loader;
