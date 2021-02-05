#### 为什么需要 webpack

背景： 在页面中引入多个 script 已经成为常态

##### 使用脚本引入的缺点：

1. 由于每一个脚本之间都有依赖关系，需要保证引入的 script 的顺序，但是人工维护这个顺序关系比较复杂

2. 每一个 script 意味这需要向服务端发送一个请求，在 HTTP2 出现之前这种成本是很高的，请求次数较多会减缓网页的加载速度

3. 每个 script 标签的顶层作用域是全局，所以变量或者函数的声明会造成全局作用域污染

##### 模块化解决的问题

1. 通过 导入和导出 语句清楚的知道多个模块之间的依赖关系

2. 借助工具来实现打包，页面中只需要引入打包合并后的文件，减少了请求次数

3. 多个模块之间作用域是隔离的，不会造成命名冲突

##### 模块打包工具的作用

1. 解决模块间的依赖关系

2. 使其打包之后可以运行在浏览器上

工作方式：

1. 将存在依赖关系的模块按照特定的规则合并为单个的 JS 文件，一次性全部加载到页面中

2. 页面初始的时候加载一个入口模块，其他的模块进行异步加载

#### 为什么选择 webpack

1. webpack 支持多种模块标准

2. 具有很全面的 代码分割 方案，首屏只加载必要的部分，不太重要的功能放到后面动态地加载

3. 可以处理各种格式的文件 图片 样式 模版；我们需要做的就是在 js 中导入这些文件

4. 社区强大

#### 安装 webpack

1. 全局安装

2. 项目安装 可以保证不同的人在运行项目的时候版本一致

一般需要同时安装 `webpack webpack-cli` webpack 是核心库 webpack-cli 是命令行工具

#### webpack 运行

1. 命令行运行

```
npx webapck --entry=./index.js --output-filename=bundle.js --mode=development
```

-- mode 用于指定 webpack 的工作模式 有两种 `development production` webpack 会根据我们指定的不同模式 默认给我们一些配置

2. npm 运行 需要在 package.json 配置 scripts 脚本 `npm run xxx`

```
{
    ...
    "script": {
        "build": "webapck --entry=./index.js --output-filename=bundle.js --mode=development"
    }
    ...
}
```

#### 配置文件 webpack.config.js

```
const path = require("path");
module.exports = {
  entry: "./src/index/js",
  // webpack 对于 output.path 要求使用绝对路径
  // 可以使用路径拼接函数 path.join / 路径解析函数 path.resolve
  // node 中的常量 __dirname 表示当前文件所在的绝对路径 （精确到对应的目录）
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development"
};

```

修改脚本配置

```
{
    ...
    "script": {
        "build": "webapck"
    }
    ...
}
```

#### webpack-dev-server

webpack-dev-server 作为开发环境中的依赖进行安装 它只是帮助我们在开发环境中启动一个服务器 上线之后并不再需要

修改脚本配置

```
{
    ...
    "script": {
        "build": "webapck",
        "dev": "webpack-dev-server"
    }
    ...
}
```

修改配置文件

```
const path = require("path");
module.exports = {
  entry: "./src/index/js",
  // webpack 对于 output.path 要求使用绝对路径
  // 可以使用路径拼接函数 path.join / 路径解析函数 path.resolve
  // node 中的常量 __dirname 表示当前文件所在的绝对路径 （精确到对应的目录）
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
      publicPath: '/dist'
  }
};

```

##### webpack-dev-server 的功能

1. **令 webpack 对资源进行打包，并处理打包结果的资源请求**

2. 作为普通的 Web Server，处理对静态资源的请求

3. 文件更改自动刷新浏览器

**直接用 Webpack 开发和使用 webpack-dev-server 有一个很大的区别，前者每次都会生成 bundle.js，而 webpack-dev-server 只是将打包结果放在内存中，并不会写入实际的 bundle.js，在每次 webpack-dev-server 接收到请求时都只是将内存中的打包结果返回给浏览器。**

#### 总结

webpack 帮助我们处理模版间的依赖关系 将他们合成同一个 JS 文件

#### 问答

commonJS 条件 require() 在打包的时候会把所有的包都会引进来
