class CompilationPlugin {
  apply(compiler) {
    // compilation 同步钩子
    compiler.hooks.compilation.tap(
      "CompilationPlugin",
      (compilation, params) => {
        // console.log(compilation);
        // console.log(params);
      }
    );
  }
}

module.exports = CompilationPlugin;
