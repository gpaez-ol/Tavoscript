import * as parser from "parser";
// TODO: Switch for a file
const code: string = "ints x = 0;";

const compileBtn = document.getElementById("runtimeBtn");
compileBtn?.addEventListener("click", () => {
  try {
    parser.parse(code);
  } catch {
    console.log("Error al analizarse");
  }
});

export default {};
