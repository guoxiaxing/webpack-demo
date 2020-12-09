/******/ (() => { // webpackBootstrap
/*!**********************!*
  !*** ./src/index.js ***!
  \**********************/
/** HAHAHAHEHE;
 **/class Test {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
const t = new Test("loader");
console.log(t);
// =====================================================
// 行内loader
// -! 不会让文件再通过pre+normal loader再去处理
// ! 不要normal
// !! 什么都不要
// const a = require("!!inline-loader!./a.js");
// console.log("index");
// console.log(a);

// loader 默认是由两部分组成 pitch+normal

// 越过 loader(Pitching loader)

// loader 总是从右到左地被调用。有些情况下，loader 只关心 request 后面的元数据(metadata)，并且忽略前一个 loader 的结果。
// 在实际（从右到左）执行 loader 之前，会先从左到右调用 loader 上的 pitch 方法。

// use: [
//     'a-loader',
//     'b-loader',
//     'c-loader'
// ]

// 执行顺序

// |- a-loader `pitch`
//   |- b-loader `pitch`
//     |- c-loader `pitch`
//       |- requested module is picked up as a dependency
//     |- c-loader normal execution
//   |- b-loader normal execution
// |- a-loader normal execution

// 首先，传递给 pitch 方法的 data，在执行阶段也会暴露在 this.data 之下，并且可以用于在循环时，捕获和共享前面的信息。

// 其次，如果某个 loader 在 pitch 方法中给出一个结果，那么这个过程会回过身来，并跳过剩下的 loader。
// 在我们上面的例子中，如果 b-loader 的 pitch 方法返回了一些东西：

// module.exports.pitch = function(remainingRequest, precedingRequest, data) {
//   if (someCondition()) {
//     return (
//       "module.exports = require(" +
//       JSON.stringify("-!" + remainingRequest) +
//       ");"
//     );
//   }
// };

// 上面的步骤将被缩短为：

// |- a-loader `pitch`
//   |- b-loader `pitch` returns a module
// |- a-loader normal execution

/******/ })()
;
//# sourceMappingURL=bundle.js.map