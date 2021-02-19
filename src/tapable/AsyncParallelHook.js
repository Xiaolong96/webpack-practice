const { AsyncParallelHook, AsyncParallelBailHook } = require("tapable");

class Work {
  constructor() {
    this.hook = {
      step: new AsyncParallelHook(["name"]), // 异步并行
    };
  }

  register() {
    // 注册事件的方式有3种，tap、tapAsync、tapPromise
    this.hook.step.tapAsync("A", (name, cb) => {
      setTimeout(() => {
        console.log("A---", name);
        cb();
      }, 1000);
    });
    this.hook.step.tapPromise("B", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("B---", name);
          resolve();
        }, 2000);
      });
    });
    this.hook.step.tapAsync("C", (name, cb) => {
      setTimeout(() => {
        console.log("C---", name);
        cb();
      }, 1000);
    });
  }

  start() {
    // 触发监听的方式也有3种，call、callAsync、promise
    this.hook.step.promise("xl").then(() => {
      console.log("call end");
    });
    // this.hook.step.callAsync("xl", () => {
    //   console.log("call end");
    // });
  }
}

const t = new Work();
t.register();
t.start();
