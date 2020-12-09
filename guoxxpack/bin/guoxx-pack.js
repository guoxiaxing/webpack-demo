#! /usr/bin/env node

// 上面的一行告诉这个bin文件需要在node环境下运行

// 1. 需要拿到当前执行这个命令的路径 拿到webpack.config.js
const path = require("path");

const config = require(path.resolve("webpack.config.js"));

const Compiler = require("../lib/Compiler");

const compiler = new Compiler(config);

compiler.hooks.entryOption.call();

compiler.run();
