const { SyncBailHook } = require("tapable");

// class SyncBailHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//     let index = 0,
//       ret;
//     do {
//       ret = this.tasks[index++](...args);
//     } while (index < this.tasks.length && !ret);
//   }
// }

class Work {
  constructor() {
    this.hook = {
      step: new SyncBailHook(["name"]), // 返回值不为 undefined 即结束
    };
  }

  register() {
    this.hook.step.tap("A", (name) => {
      console.log("A---", name);
      return "停止继续执行";
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
