<h1 align="center">Welcome to webpack-practice 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> webpack practice with webpack5

**git subtree 管理源码子目录**

更新源码

```bash
git subtree pull -P webpack webpack master
```

**vscode debug 调试**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug webpack",
      "program": "${workspaceFolder}/debug/start.js",
      "skipFiles": [
        // "${workspaceFolder}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}
```

**Tapable**

- 简单使用
- 类图
- hook 触发源码调用时序图

**buildTest**

- 打包 demo

**mini-webpack**

模块解析后流程简单模拟实现

**x-plugin**

**x-webpack-plugin**

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **xiongxiaolong**

## Show your support

Give a ⭐️ if this project helped you!
