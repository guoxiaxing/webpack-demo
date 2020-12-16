require("./index.css");
// 需要在入口文件中serviceWorker
// 注册serviceWorker
// 处理兼容性问题

// serviceWorker的代码必须运行在服务器上 所以 我们需要在dist目录下启一个服务 不能直接双击index.html来进行访问页面

if ("serviceWorker" in window.navigator) {
  window.addEventListener("load", () => {
    // register 方法接收的参数就是service-worker的配置文件 有webpack的插件自动生成
    window.navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("serviceWorker 注册成功～～");
      })
      .catch(err => {
        console.log(err);
        console.log("serviceWorker 注册失败～～");
      });
  });
}
