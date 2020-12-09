const path = require("path");
const fs = require("fs");
const babylon = require("babylon");
const types = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const ejs = require("ejs");
const { SyncHook } = require("tapable");

// babylon 主要是将源码转换为 AST
// @babel/traverse 节点转换
// @babel/types
// @babel/generator 将转换后的结果重新生成
class Compiler {
  constructor(config) {
    // entry output
    this.config = config;
    // 需要保存入口文件的路径
    this.entryId;
    // 需要保存所有的模块依赖
    this.modules = {};

    // 获取入口文件路径
    this.entry = config.entry;
    // 获取工作目录
    this.root = process.cwd();

    this.assets = {};
    // 定义一些 hook 在 webpack 打包的指定时刻进行调用
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    };
    // 如果传递了 plugins
    const plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        // 将我们编译好的对象传递进去
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }
  getSource(path) {
    let content = fs.readFileSync(path, "utf8");
    // path是我们导入的每个模块的路径
    const rules = this.config.module.rules;
    // 拿到每个规则来处理
    for (let i = 0; i < rules.length; i++) {
      const { test, use } = rules[i];
      // loader的执行顺序是从右到左的
      let len = use.length - 1;
      // 该文件匹配到，所以使用该loader来处理
      if (test.test(path)) {
        while (len >= 0) {
          // 获取到对应的loader
          const loader = require(use[len--]);
          // 源码转换
          content = loader(content);
        }
      }
    }

    return content;
  }
  // 构建模块
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    const source = this.getSource(modulePath);
    // 模块id 是一个相对路径 webpack 模块打包之后 moduleId是一个相对路径 modulePath - this.root
    const moduleName = "./" + path.relative(this.root, modulePath);

    if (isEntry) {
      // 如果是主入口 保存入口的名字
      this.entryId = moduleName;
    }
    // 解析需要把source源码进行改造返回一个 依赖列表
    const { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );
    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;

    // 递归分析依赖
    dependencies.forEach(dep => {
      // 注意 路径为绝对路径 而且不是主模块
      this.buildModule(path.resolve(this.root, dep), false);
    });
  }
  parse(source, parentPath) {
    // AST 解析语法树
    const ast = babylon.parse(source);
    const dependencies = []; //依赖的数组
    traverse(ast, {
      CallExpression(p) {
        // p 指的是函数调用 eg: a() require()
        // https://astexplorer.net/ 使用这个网站可以看到ast的转换结果 也就是我们取下面这些数据的依据
        const node = p.node;
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 取到模块的引用名字 这个时候的模块名称是我们传递给require的参数 一般是没有后缀名的 而且是相对路径

          // 比较粗略 也可能是别的后缀名，所以这里加的不一定是 .js
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js");
          // 得到模块的绝对路径
          moduleName = "./" + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [types.stringLiteral(moduleName)]; // 相当于将源码给修改了
        }
      }
    });
    // 重新生成源码
    const sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
  }
  emitFile() {
    // 用数据渲染我们的模版
    // 拿到我们需要输出编译后的文件的路径
    const main = path.join(
      this.config.output.path,
      this.config.output.filename
    );

    const tempStr = this.getSource(path.join(__dirname, "./main.ejs"));
    const code = ejs.render(tempStr, {
      entryId: this.entryId,
      modules: this.modules
    });
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }
  run() {
    this.hooks.run.call();
    this.hooks.compile.call();
    // 执行并创建依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 发射一个文件 打包后的文件
    this.hooks.afterCompile.call();
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}
module.exports = Compiler;
