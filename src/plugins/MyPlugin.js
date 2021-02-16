/*
 * @Author: xiongxiaolong
 * @Date: 2021-02-15 00:54:02
 * @LastEditors: xiongxiaolong
 * @LastEditTime: 2021-02-15 00:54:10
 * @Description: file information
 */
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      // Explore each chunk (build output):
      compilation.chunks.forEach((chunk) => {
        // Explore each module within the chunk (built inputs):
        chunk.getModules().forEach((module) => {
          // Explore each source file path that was included into the module:
          module.buildInfo &&
            module.buildInfo.fileDependencies &&
            module.buildInfo.fileDependencies.forEach((filepath) => {
              // we've learned a lot about the source structure now...
            });
        });

        // Explore each asset filename generated by the chunk:
        chunk.files.forEach((filename) => {
          // Get the asset source for each file generated by the chunk:
          var source = compilation.assets[filename].source();
        });
      });

      callback();
    });
  }
}
module.exports = MyPlugin;