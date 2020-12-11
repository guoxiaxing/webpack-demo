class DonePlugin {
  constructor() {}
  apply(compiler) {
    // 异步的
    compiler.hooks.done.tapAsync("DonePlugin", (stats, cb) => {
      console.log("编译完成~~~");
      cb();
    });
  }
}

// 如果想看webpack中的钩子是异步还是同步 可以  看 node_modules/webpack/Compiler.js文件

module.exports = DonePlugin;
