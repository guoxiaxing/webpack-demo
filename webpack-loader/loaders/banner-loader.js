const utils = require("loader-utils");
const schemaUtils = require("schema-utils");
const fs = require("fs");
function loader(source) {
  // 每次打包的时候都清空缓存
  //   this.cacheable(false);
  // 使用缓存 默认使用缓存
  this.cacheable && this.cacheable();
  const options = utils.getOptions(this);
  const schema = {
    type: "object",
    properties: {
      text: {
        type: "string"
      },
      filename: {
        type: "string"
      }
    }
  };
  // 异步执行
  const cb = this.async();
  // 校验参数合法
  schemaUtils.validate(schema, options, "banner-loader");
  // 但是需要注意的是 options.filename 这个文件在我们开启了webpack的watch模式之后 并不会由于我们修改了 options.filename 文件
  // webpack就帮我们自动去编译 所以需要我们把这个文件加入到webpack的监听
  this.addDependency(options.filename);
  if (options.filename) {
    fs.readFile(options.filename, "utf8", (err, data) => {
      // cb 的第一个参数是err 第二个参数是loader处理之后的源码
      cb(err, `/** ${data} **/${source}`);
    });
  } else {
    cb(null, `/** ${options.text} **/${source}`);
  }
}

module.exports = loader;
