const logB = (...args) => {
  console.log("args.length:sd ", args.length);
};
export class B {
  static call() {
    console.info("🎈 %c[call B]\n", "color: #1890ff;");
  }
}

// export const gen = function* () {
//   yield "generator called";
// };

document.getElementsByClassName("container")[0].innerHTML = "Hi~";

export default logB;
