const logB = (...args) => {
  console.log("args.length: ", args.length);
};
export class B {
  static call() {
    console.info("🎈 %c[call B]\n", "color: #1890ff;");
  }
}

// export const gen = function* () {
//   yield "generator called";
// };

export default logB;
