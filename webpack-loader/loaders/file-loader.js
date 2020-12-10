const utils = require("loader-utils");
function loader(source) {
  // 根据图片的内容生成一个文件名
  const filename = utils.interpolateName(this, "[hash].[ext]", {
    content: source
  });
  // 将生成的文件发射到 dist 目录下 第一个参数是名字 第二个参数是文件内容
  this.emitFile(filename, source);
  return `module.exports = "${filename}" `;
}

loader.raw = true; // 将拿到的源码转化为二进制
module.exports = loader;
