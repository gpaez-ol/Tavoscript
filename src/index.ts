import * as parser from "parser";
// TODO: Switch for a file
const code: string = "2+2";

const compileBtn = document.getElementById("runtimeBtn");
compileBtn?.addEventListener("click", () => {
  try {
    const result = parser.parse(code);
    console.log("Analisis correcto", result);
  } catch {
    console.log("Error al analizarse");
  }
});

export default {};
