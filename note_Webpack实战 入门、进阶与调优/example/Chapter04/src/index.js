import "./style.css";
import "./index.ts";
import testHtml from "./test.html";
import testPng from "../assets/imgs/test.png";

function sum(a, b) {
  return a + b;
}

const log = msg => {
  console.log(msg);
};

console.log(sum(1, 2));

console.log(testHtml); //<h1>hello world!</h1>

console.log(testPng);

document.write(testHtml);
