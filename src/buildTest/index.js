import { a } from "./a";
import logB from "./b";

console.log(a);
logB(1, 2, 3);

import("./c").then((test) => {
  console.log(test);
});
