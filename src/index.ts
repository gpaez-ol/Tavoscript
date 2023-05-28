import * as parser from "parser";
// TODO: Switch for a file
var mainFunct = 'func void main(int X, int Y){ int sum = 4+5; for(x=5,x>6){sum = sum+x;}}  ';
const code: string =
  'int x[4][5][5],y; func int sum(int x[2][4][2],int y){  int newVar = x[1,3,1];   return 4+5;}';

const compileBtn = document.getElementById("runtimeBtn");
onload = () => {
  try {
    const result = parser.parse(code);
    console.log("Analisis correcto", result);
  } catch (error) {
    console.log(error);
    console.log("Error al analizarse");
  }
};
compileBtn?.addEventListener("click", () => {
  try {
    const result = parser.parse(code);
    console.log("Analisis correcto", result);
  } catch (error) {
    console.log(error);
    console.log("Error al analizarse");
  }
});

export default {};
