const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ManifestPlugin = require("webpack-manifest-plugin");
const PrefixPlugin = require("./src/plugins/PrefixPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

const plugins = [
  new CleanWebpackPlugin(),
  // new ManifestPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(__dirname, "index.html"),
    // hash: true,
  }),
  new PrefixPlugin(),
  new webpack.DefinePlugin({
    // Definitions...
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
];
if (!devMode) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8888,
    hot: true,
    headers: {
      "X-Custom-Foo": "bar",
    },
  },
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[id].[contenthash].js",
  },
  // 这些选项决定了如何处理项目中的不同类型的模块。
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  // 这些选项能设置模块如何被解析
  resolve: {
    alias: {
      buildTest: path.resolve(__dirname, "src/buildTest/"),
    },
    // 如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: [".wasm", ".mjs", ".js", ".json"],
    // 解析目录时要使用的文件名。
    mainFiles: ["index"],
    // 告诉 webpack 解析模块时应该搜索的目录
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    // 模块解析插件
    plugins: [
      // new DirectoryNamedWebpackPlugin(true)
    ],
  },
  // 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
  optimization: {
    moduleIds: "deterministic", // 避免新增模块，模块id 的变化影响 vendor 的 hash
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins,
  cache: {
    type: "filesystem",
    buildDependencies: {},
  },
};
