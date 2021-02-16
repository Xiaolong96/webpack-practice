const validateOptions = require("schema-utils");

// schema for options object
const schema = {
  type: "object",
  properties: {
    test: {
      type: "string",
    },
  },
};

class HelloWorldPlugin {
  constructor(options = {}) {
    validateOptions(schema, options, "Hello World Plugin");
  }

  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      console.info(
        "\n🎈 %c[flag]\n",
        "color: #1890ff;",
        "HelloWorldPlugin: done"
      );
    });
  }
}

module.exports = HelloWorldPlugin;
