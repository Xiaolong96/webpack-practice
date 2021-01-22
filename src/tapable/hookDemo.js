// The tapable package expose many Hook classes, which can be used to create hooks for plugins.
const { SyncHook, AsyncSeriesHook } = require('tapable');

class HookDemo {
  constructor() {
    // 要有参数字符串数组，要不后面接收不到参数
    this.hooks = {
      syncName: new SyncHook(['name']),
      // asyncName: new AsyncParallelHook(['name'])
      asyncName: new AsyncSeriesHook(['name'])
    };
  }
  // 注册
  tap() {
    this.hooks.syncName.tap('HiPlugin', (name) => {
      console.log(`Hi ${name}!`)
    })
    this.hooks.syncName.tap('ByePlugin', (name) => {
      console.log(`Bye ${name}!`)
    })
    this.hooks.asyncName.tapAsync('AsyncHiPlugin',function(name, callback){
      setTimeout(()=>{
          console.log('Hi', name);
          // 异步串行，如果不执行回调，后面的函数不会运行
          callback();
      }, 1000);
    });
    this.hooks.asyncName.tapAsync('AsyncByePlugin',function(name, callback){
      setTimeout(()=>{
          console.log('Bye', name);
          callback();
      }, 1000);
    });
  }
  // 调用
  call() {
    this.hooks.syncName.call('xiaolong')
    this.hooks.asyncName.callAsync('xiong',function(){
      console.log('end');
  });
  }
}

let h = new HookDemo();
// hook 拦截器
h.hooks.asyncName.intercept({
  // hooks 开始被触发时拦截
  call: (name) => {
    console.log('hooks are triggered,hooks arguments: ' + name);
  },
  // tap: (tap) => {
  //   console.log('a plugin taps into a hook: ' + tap.name)
  // },
  register: (tap) => {
    // tap = { type: 'sync', fn: [Function], name: 'HiPlugin' }
    console.log('register: ' + tap.name)
  }
})
h.tap();
h.call();

/*
register: AsyncHiPlugin
register: AsyncByePlugin
Hi xiaolong!
Bye xiaolong!
hooks are triggered,hooks arguments: xiong
Hi xiong
Bye xiong
end
*/