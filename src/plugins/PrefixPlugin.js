/*
 * @Author: xiongxiaolong
 * @Date: 2021-02-10 20:55:49
 * @LastEditors: xiongxiaolong
 * @LastEditTime: 2021-02-21 04:09:06
 * @Description: file information
 */
// 处理源码拼接库
const ConcatSource = require("webpack-sources").ConcatSource;
const Compilation = require("webpack/lib/Compilation");

class PrefixPlugin {
  apply(compiler) {
    /* BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
    Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.*/
    compiler.hooks.compilation.tap("PrefixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "PrefixPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          var assets = compilation.getAssets();

          assets.forEach((asset) => {
            if (/main\..*\.js$/.test(asset.name)) {
              var source = new ConcatSource(
                `/*! 这是 prefix-plugin 加上的 */`,
                asset.source
              );
              compilation.updateAsset(asset.name, source);
            }
          });
        }
      );
    });
  }
}

module.exports = PrefixPlugin;
