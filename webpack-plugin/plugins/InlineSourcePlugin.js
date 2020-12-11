const HtmlWebpackPlugin = require("html-webpack-plugin");
class InlineSourcePlugin {
  // 将我们的脚本文件和css样式通过内联的方式插入到index.html中 而不是通过标签引入
  constructor({ match }) {
    this.match = match;
  }
  processTags(data, compilation) {
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    return { ...data, headTags, bodyTags };
  }
  processTag(tag, compilation) {
    let newTag, url;
    if (tag.tagName === "link" && this.match.test(tag.attributes.href)) {
      newTag = {
        tagName: "style"
      };
      url = tag.attributes.href;
    }
    if (tag.tagName === "script" && this.match.test(tag.attributes.src)) {
      newTag = {
        tagName: "script"
      };
      url = tag.attributes.src;
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source();
      // 删除原来应该生成的资源
      delete compilation.assets[url];
      return newTag;
    }
    return tag;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("InlineSourcePlugin", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        "alterAssetTagGroups",
        (data, cb) => {
          // data 就是要插入的标签数据
          //   {
          //     headTags: [ { tagName: 'link', voidTag: true, attributes: [Object] } ],
          //     bodyTags: [ { tagName: 'script', voidTag: false, attributes: [Object] } ],
          //     outputName: 'index.html',
          //     plugin: HtmlWebpackPlugin {
          //       options: {
          //         template: '/Users/guoxx03/Desktop/test/webpack-demo/webpack-plugin/node_modules/html-webpack-plugin/lib/loader.js!/Users/guoxx03/Desktop/test/webpack-demo/webpack-plugin/src/index.html',
          //         templateContent: false,
          //         templateParameters: [Function: templateParametersGenerator],
          //         filename: 'index.html',
          //         publicPath: 'auto',
          //         hash: false,
          //         inject: 'body',
          //         scriptLoading: 'blocking',
          //         compile: true,
          //         favicon: false,
          //         minify: 'auto',
          //         cache: true,
          //         showErrors: true,
          //         chunks: 'all',
          //         excludeChunks: [],
          //         chunksSortMode: 'auto',
          //         meta: {},
          //         base: false,
          //         title: 'Webpack App',
          //         xhtml: false
          //       },
          //       childCompilerHash: 'c1a79f4107b7f72ab95a',
          //       assetJson: '["bundle.js","main.css"]',
          //       hash: undefined,
          //       version: 4
          //     }
          //   }
          data = this.processTags(data, compilation); // compilation.assets
          cb(null, data);
        }
      );
    });
  }
}

module.exports = InlineSourcePlugin;
