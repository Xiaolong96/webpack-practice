const {
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require("tapable");

// class AsyncSeriesHook {
//   constructor(args) {
//     this.tasks = [];
//   }
//   tapAsync(name, task) {
//     this.tasks.push(task);
//   }
//   callAsync(...args) {
//     const finalCallback = args.pop();
//     let index = 0;
//     const cb = () => {
//       index++;
//       if (index === this.tasks.length) {
//         return finalCallback();
//       }
//       this.tasks[index](...args, cb);
//     };
//     this.tasks[0](...args, cb);
//   }
// }

class Work {
  constructor() {
    this.hook = {
      step: new AsyncSeriesHook(["name"]), // 异步串行
    };
  }

  register() {
    this.hook.step.tapAsync("A", (name, cb) => {
      setTimeout(() => {
        console.log("A---", name);
        cb();
      }, 1000);
    });
    this.hook.step.tapAsync("B", (name, cb) => {
      setTimeout(() => {
        console.log("B---", name);
        // cb();
      }, 1000);
    });
    this.hook.step.tapAsync("C", (name, cb) => {
      setTimeout(() => {
        console.log("C---", name);
        cb();
      }, 1000);
    });
  }

  start() {
    this.hook.step.callAsync("xl", () => {
      // 所有的 cb 都被调用才会执行
      console.log("call end");
    });
  }
}

const t = new Work();
t.register();
t.start();
