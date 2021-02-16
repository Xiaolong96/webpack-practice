/*
 * @Author: xiongxiaolong
 * @Date: 2021-02-10 20:55:49
 * @LastEditors: xiongxiaolong
 * @LastEditTime: 2021-02-17 01:09:49
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
          // console.info("🎈 %c[flag]\n", "color: #1890ff;", assets);

          assets.forEach((asset) => {
            if (/^main.*\.js$/.test(asset.name)) {
              var source = new ConcatSource(
                `#!/usr/bin/env node\n\n\n`,
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
