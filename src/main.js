// 异步加载 show.js
import('./show').then((show) => {
    // 执行 show 函数
    show('Webpack');
  });
  
