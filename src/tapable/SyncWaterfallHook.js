const { SyncWaterfallHook } = require("tapable");

// class SyncWaterfallHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tap(name, task) {
//     this.tasks.push(task);
//   }
//   call(...args) {
//     const [firstTask, ...restTasks] = this.tasks;
//     const ret = firstTask(...args);
//     restTasks.reduce((val, task) => {
//       return task(val);
//     }, ret);
//   }
// }

class Work {
  constructor() {
    this.hook = {
      step: new SyncWaterfallHook(["name"]),
    };
  }

  register() {
    this.hook.step.tap("A", (name) => {
      console.log("A---", name);
      return "step A 的返回值";
    });
    this.hook.step.tap("B", (value) => {
      console.log("B---", value);
    });
  }

  start() {
    this.hook.step.call("xl");
  }
}

const t = new Work();
t.register();
t.start();
