const webpack = require("../webpack/lib/webpack");
const config = require("../webpack.config");

// compiler是webpack的启动入口，直接调用即可
const compiler = webpack(config);
compiler.run();
