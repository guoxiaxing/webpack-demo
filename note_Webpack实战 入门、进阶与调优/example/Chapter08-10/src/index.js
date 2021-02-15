import { sum } from "./index.ts";
import(/* webpackChunkName: 'bar' */ "./app").then(() => {
  console.log("load app");
});

const fn = () => 1;

console.log(fn());

console.log(sum);
