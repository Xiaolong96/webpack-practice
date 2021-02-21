const { getOptions } = require("loader-utils");
const validate = require("schema-utils");
const fs = require("fs");

const schema = {
  type: "object",
  properties: {
    text: {
      type: "string",
    },
    filename: {
      type: "string",
    },
  },
};

function loader(source) {
  // console.info(source);

  const options = getOptions(this);

  // console.info("🎈 %c[loaderContext]\n", "color: #1890ff;", Object.keys(this));

  validate(schema, options, {
    name: "prefix-loader",
    baseDataPath: "options",
  });

  const cb = this.async();

  if (options.filename) {
    // 添加文件依赖，watch 状态下，文件改动会重新打包
    this.addDependency(options.filename);

    fs.readFile(options.filename, "utf8", function (err, data) {
      cb(err, `/**${data}**/${source}`);
    });
  } else {
    cb(null, `/**${options.text}**/${source}`);
  }
}

module.exports = loader;
