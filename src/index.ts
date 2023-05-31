import * as parser from "parser";
const {startProgram} = require ("./virtualMachine");
// TODO: Switch for a file
var mainFunct = 'func void main(int X, int Y){ int sum = 4+5; for(x=5,x>6){sum = sum+x;}}';
var arrayFunc = 'int x[2][3],Y,Z; func void main(){  read(x[2,1],Y); int newVar;  }';
const code: string ='int x[2][3],Y,Z; func void main(){   x[0,0] = 2+2*5; int newVar=x[0,0]*2; print(newVar);}';

const compileBtn = document.getElementById("runtimeBtn");
onload = () => {
  try {
    const result = parser.parse(code);
    startProgram(result);
    console.log("Starting Process ------------------------")
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
