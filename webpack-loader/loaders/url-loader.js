const utils = require("loader-utils");
const mime = require("mime");
function loader(source) {
  const { limit } = utils.getOptions(this);
  if (limit && limit > source.length) {
    // 转base64
    return `module.exports = "data:${mime.getType(
      this.resourcePath
    )};base64,${source.toString("base64")}"`;
  } else {
    return require("./file-loader").call(this, source);
  }
}

loader.raw = true; // 将拿到的源码转化为二进制
module.exports = loader;
