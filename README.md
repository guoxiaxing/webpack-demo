#### 模拟实现 webpack 的打包逻辑

##### guoxxpack - webpack 的打包逻辑实现源码

guoxxpack 的 `package.json` 中配置了 `bin` 下的可执行命令

`guoxx-pack` 运行 这个命令即可实现 webpack 的打包逻辑

`lib` 目录下主要是 webpack 打包的核心执行代码

使用：

- 根目录下运行 `npm link` 将该模块 link 到全局

##### webpack-dev - 使用 guoxxpack 进行打包的 demo

这个目录只要是用来测试我们自己实现的 webpack 是否好用

- 根目录下 执行 `npm link guoxxpack` 来使用我们自定义的 webpack

- `webpack.config.js` 还是使用这个作为配置文件 以及配置的内容都是和 webpack 一致的

- 运行 `guoxx-pack` 进行打包

- 将打包后的文件 注入到 `index.html` 中看是否可以成功执行

##### webpack-loader - webpack 的 loader 的原理以及实现自定义 loader
