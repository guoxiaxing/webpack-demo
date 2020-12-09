function loader(source) {
  const style = `
    const style = document.createElement('style');
    // JSON.stringify(source) 是为了去除换行
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  return style;
}
module.exports = loader;
