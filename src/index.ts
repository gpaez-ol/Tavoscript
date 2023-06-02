import * as parser from "parser";
const {startProgram} = require ("./virtualMachine");
// TODO: Switch for a file
var mainFunct = 'func void main(int X, int Y){ int sum = 4+5; for(x=5,x>6){sum = sum+x;}}';
var arrayFunc = 'int x[2][3],Y,Z; func void main(){  read(x[2,1],Y); int newVar;  }';
const sumFunc = "int x[2][3],Y,Z;  func int sum(int valueA,int valueB){ int sum = valueA+valueB; if(sum > 20) { return sum;} else { return :sum(sum,2);} }  func void main(){     int otherSum = 2+2; x[1,0]=8+2;  int sumResult = :sum(x[1,0],5); print(sumResult);}"
const iteratorFact = "func int factorial(int number){int total = 1; for(x=1,x:<number){total = total*x; x = x+1;} return total;} func void main(){print(:factorial(3));}"
const iteratorFibonacci= 'func void fibonacci(int number){int t1 = 0; int t2=1; int nextTerm = t1+t2; for(x=3,x:<number){print("Next Term:",nextTerm); t1=t2; t2=nextTerm; nextTerm = t1+t2; x = x+1;}} func void main(){ :fibonacci(21); }';
const whileFibonacci = 'func void fibonacci(int number){int t1 = 0; int t2=1; int nextTerm = t1+t2; while(nextTerm:<number){print("Term:",nextTerm); t1=t2; t2=nextTerm; nextTerm = t1+t2;}} func void main(){ :fibonacci(5); }';
const recursiveFibonacci = "func int fibonacci(int number){ if(number < 2){ return number;} else { return :fibonacci(number-1) + :fibonacci(number-2); } } int x=:fibonacci(4); func void main(){    print(:fibonacci(x)); print(x); }"
const simpleArraySum = "func int sumArray(int value){int x[1][2],y[1][2];  x[0,0]=5;  y[0,1]=x[0,0]-2; return y[0,1];} func void main(){print(:sumArray(5));}"
const arrayAndNormalVariables = "func int sumArray(int x[1][2],int z){int y[1][2];    y[0,1]=x[0,1]-z; return y[0,1];} func void main(){ int mainArray[1][2]; mainArray[0,1]=10;  print(:sumArray(mainArray,5));}";
const code: string = 'func int sumArray(int x[1][2],int z){int y[1][2];    y[0,1]=x[0,1]-z; return y[0,1];} func void main(){ int mainArray[1][2]; mainArray[0,1]=10;  print(:sumArray(mainArray,5));}';

const compileBtn = document.getElementById("runtimeBtn");
onload = () => {
  try {
    const result = parser.parse(code);
    startProgram(result);
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
