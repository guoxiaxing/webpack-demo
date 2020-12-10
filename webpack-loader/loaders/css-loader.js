function loader(source) {
  const reg = /url\((.+?)\)/g;
  let current;
  let pos = 0;
  const arr = ["let list = [];"];
  while ((current = reg.exec(source))) {
    const [matchUrl, group] = current;
    const last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    // 把 g 替换成 require 的写法
    arr.push(`list.push('url(' + require(${group}) + ')')`);
    pos = reg.lastIndex;
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);
  return arr.join("\n");
}
module.exports = loader;
