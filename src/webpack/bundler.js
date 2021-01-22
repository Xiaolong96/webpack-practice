/*
 * @Author: xiongxiaolong
 * @Date: 2020-06-28 17:31:07
 * @LastEditors: xiongxiaolong
 * @LastEditTime: 2021-01-21 21:58:31
 * @Description: file information
 */
//导入包
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

function stepOne(filename) {
  //读入文件
  const content = fs.readFileSync(filename, "utf-8");
  // 利用 @babel/parser 生成AST抽象语法树
  const ast = parser.parse(content, {
    sourceType: "module", //babel官方规定必须加这个参数，不然无法识别ES Module
  });
  const dependencies = {};
  //利用 @babel/traverse 遍历AST抽象语法树
  traverse(ast, {
    //获取通过import引入的模块
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      const newFile = "./" + path.join(dirname, node.source.value);
      //保存所依赖的模块
      dependencies[node.source.value] = newFile;
    },
  });
  //通过 @babel/core 和 @babel/preset-env 进行代码的转换
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  return {
    filename, //该文件名
    dependencies, //该文件所依赖的模块集合(键值对存储)
    code, //转换后的代码
  };
}
//entry为入口文件
function stepTwo(entry) {
  const entryModule = stepOne(entry);
  //这个数组是核心，虽然现在只有一个元素，往后看你就会明白
  const graphArray = [entryModule];
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i];
    const { dependencies } = item; //拿到文件所依赖的模块集合(键值对存储)
    for (let j in dependencies) {
      graphArray.push(stepOne(dependencies[j])); //敲黑板！关键代码，目的是将入口模块及其所有相关的模块放入数组
    }
  }
  //接下来生成图谱
  const graph = {};
  graphArray.forEach((item) => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    };
  });
  return graph;
}

console.log(stepTwo("./src/index.js"));

//下面是生成代码字符串的操作，仔细看，不要眨眼睛哦！
function step3(entry) {
  //要先把对象转换为字符串，不然在下面的模板字符串中会默认调取对象的toString方法，参数变成[Object object],显然不行
  const graph = JSON.stringify(stepTwo(entry));
  return `
      (function(graph) {
          //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
          function require(module) {
              //localRequire的本质是拿到依赖包的exports变量
              function localRequire(relativePath) {
                  return require(graph[module].dependencies[relativePath]);
              }
              var exports = {};
              (function(require, exports, code) {
                  eval(code);
              })(localRequire, exports, graph[module].code);
              return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
          }
          require('${entry}')
      })(${graph})`;
}

//最终测试
const code = step3("./src/index.js");
console.log(code);

/*
核心功能
1. 可以将 ES6 语法转换成 ES5 的语法：
利用 @babel/parser 生成AST抽象语法树，再通过 @babel/core 和 @babel/preset-env 进行代码的转换
2. 可以分析模块之间的依赖关系：
利用 @babel/traverse 遍历AST抽象语法树，并通过它的 ImportDeclaration 方法获取依赖属性，逐步对依赖进行分析，可获得完整的依赖图谱
3. 生成的 js 文件可在浏览器中运行：
最后打包出的是一个 IIFE，拥有独立的词法作用域，避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域；
通过 IIFE 传入参数，重新定义 require（__webpack_require_）和 exports
*/
