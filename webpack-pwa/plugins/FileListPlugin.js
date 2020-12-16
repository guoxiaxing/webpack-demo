class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }
  apply(compiler) {
    // emit 钩子执行时 文件已经准备好了
    compiler.hooks.emit.tap("FileListPlugin", compilation => {
      // 获取打包后的资源列表
      const assets = compilation.assets;
      let content = "## 文件名        文件大小\n";
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `- ${filename}        ${statObj.size()}\n`;
      });
      // 给发射的资源里面添加文件
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        }
      };
    });
  }
}

module.exports = FileListPlugin;
