const less = require("less");
function loader(source) {
  let css = "";
  less.render(source, (err, res) => {
    css = res.css;
  });
  return css;
}

module.exports = loader;
