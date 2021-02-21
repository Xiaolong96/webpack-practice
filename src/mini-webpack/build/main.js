(function () {
  var graph = {
    "./src/index.js": {
      dependencies: { "./buildTest/a.js": "./src/buildTest/a.js" },
      code:
        '"use strict";\n\nvar _a = require("./buildTest/a.js");\n\n// import logB, { B, gen } from "./buildTest/b.js";\n// import "./style.css";\n// import bgImg from "./static/bg.jpg";\nconsole.log(_a.a); // logB(1, 2, 3);\n// B.call();\n// console.log(gen().next());\n// import("./buildTest/c").then((test) => {\n//   console.log(test);\n// });\n// // module.hot.accept 使用 HMR\n// if (process.env.NODE_ENV === "development" && module.hot) {\n//   module.hot.accept("./buildTest/b.js", function () {\n//     console.info("🎈 %c[module.hot]\\n", "color: #1890ff;", "./buildTest/b.js");\n//   });\n// }\n// const img = new Image(400);\n// img.src = bgImg;\n// document.body.appendChild(img);',
    },
    "./src/buildTest/a.js": {
      dependencies: {},
      code:
        '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.a = void 0;\nvar a = "a";\nexports.a = a;',
    },
  };
  //require 函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
  function require(module) {
    //localRequire的本质是拿到依赖包的exports变量
    function localRequire(relativePath) {
      return require(graph[module].dependencies[relativePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(localRequire, exports, graph[module].code);
    return exports; //函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
  }
  require("./src/index.js");
})();
