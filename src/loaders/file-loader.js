/*
 * @Author: xiongxiaolong
 * @Date: 2021-02-21 05:34:10
 * @LastEditors: xiongxiaolong
 * @LastEditTime: 2021-02-21 06:10:04
 * @Description: file information
 */
const { interpolateName } = require("loader-utils");

// file-loader 1、emit 文件到 build 2、返回文件路径
function loader(source) {
  console.info("🎈 %c[source]\n", "color: #1890ff;", source);

  // 修改文件名
  const filename = interpolateName(this, "[hash].[ext]", {
    content: source,
  });

  // 发射文件
  this.emitFile(filename, source);
  return `module.exports = "./${filename}"`;
}

// 保留文件的二进制 buffer 格式
loader.raw = true;

module.exports = loader;
