// const autoprefixer = require("autoprefixer");
// const stylelint = require("stylelint");
const postcssCssnext = require("postcss-cssnext");
module.exports = {
  plugins: [
    postcssCssnext({
      // 指定所支持的浏览器
      browers: [">1%", "last 2 versions"]
    })
    // stylelint({
    //   config: {
    //     rules: {
    //       "declaration-no-important": true
    //     }
    //   }
    // })
    // autoprefixer({
    //   // 需要支持的特性
    //   grid: true,
    //   // 需要兼容的浏览器
    //   browsers: ["> 1%", "last 3 versions", "android 4.2", "ie 8"]
    // })
  ]
};
