// import { A } from "./buildTest/a";
// import B from "./buildTest/b";
// console.log(A);
// B();

import("./buildTest/c").then((test) => {
  console.log(test);
});
console.log("index");
