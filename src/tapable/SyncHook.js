const { SyncHook } = require("tapable");

// class SyncHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//     this.tasks.forEach((task) => {
//       task(...args);
//     });
//   }
// }

class Work {
  constructor() {
    this.hook = {
      step: new SyncHook(["name"]),
    };
  }

  register() {
    this.hook.step.tap("A", (name) => {
      console.log("A---", name);
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
