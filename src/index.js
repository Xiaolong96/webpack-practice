import { a } from "./buildTest/a";
import logB, { B, gen } from "./buildTest/b";
import "./style.css";
import fireImg from "./static/fire.png";

console.log(a);
logB(1, 2, 3);
B.call();
// console.log(gen().next());

import("./buildTest/c").then((test) => {
  console.log(test);
});

// module.hot.accept 使用 HMR
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./buildTest/b.js", function () {
    console.info("🎈 %c[module.hot]\n", "color: #1890ff;", "./buildTest/b.js");
  });
}

const img = new Image(100);
img.src = fireImg;
document.body.appendChild(img);
