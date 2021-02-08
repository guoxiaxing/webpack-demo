const loaderUtils = require("loader-utils");
const SourceNode = require("source-map").SourceNode;
const SourceMapConsumer = require("source-map").SourceMapConsumer;

module.exports = function(source, sourceMap) {
  // 从loader中我们获取到我们的sourceMap对象，它是由上一个loader传下来的
  const prefix = "'use strict'; \n\n";

  // 使用缓存
  if (this.cacheable) {
    this.cacheable();
  }
  // 获取和打印options
  const options = loaderUtils.getOptions(this) || {};
  console.log(options); // { sourceMap: true }

  if (options.sourceMap && sourceMap) {
    const currentRequest = loaderUtils.getCurrentRequest(this);
    const node = SourceNode.fromStringWithSourceMap(
      source,
      new SourceMapConsumer(sourceMap)
    );
    node.prepend(prefix);
    const result = node.toStringWithSourceMap({ file: currentRequest });
    const callback = this.async();
    // 使用callback主要是为了一次性可以返回多个值
    // 三个参数分别是 发生的错误，处理过后的源码，以及source-map
    callback(null, result.code, result.map.toJSON());
  }
  // 不支持 sourceMap 的情况
  return prefix + source;
};
