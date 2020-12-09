function loader(source) {
  // loader接收的参数就是我们的源码
  console.log("inline-loader~~");
  return source;
}
module.exports = loader;
