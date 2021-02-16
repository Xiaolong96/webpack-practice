import { a } from "./buildTest/a";
import logB from "./buildTest/b";
import "./style.css";

console.log(a);
logB();

import("./buildTest/c").then((test) => {
  console.log(test);
});

// module.hot.accept 使用 HMR
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./buildTest/b.js", function () {
    console.info("🎈 %c[module.hot]\n", "color: #1890ff;", "./buildTest/b.js");
  });
}
