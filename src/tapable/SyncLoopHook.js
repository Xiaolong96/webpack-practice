const { SyncLoopHook } = require("tapable");

// class SyncLoopHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//     this.tasks.forEach((task) => {
//       let ret;
//       do {
//         ret = task(...args);
//       } while (ret !== undefined);
//     });
//   }
// }

class Work {
  constructor() {
    this.hook = {
      step: new SyncLoopHook(["name"]), // 只要订阅函数的返回值不为undefined，就会重复循环执行
    };
  }

  register() {
    this.hook.step.tap("A", (name) => {
      console.log("A---", name);
      return Math.random() < 0.6 ? "value" : undefined;
    });
    this.hook.step.tap("B", (name) => {
      console.log("B---", name);
    });
  }

  start() {
    this.hook.step.call("xl");
  }
}

const t = new Work();
t.register();
t.start();
