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
const matrixesMultiplication = "func void multiplyMatrixes(int x[2][2],int y[2][2]){  int c[2][2]; for(i=0,i<2){for(j=0,j<2){ c[i,j]=0; for(k=0,k<2){c[i,j] = c[i,j] + x[i,k] * y[k,j]; k=k+1; } j=j+1;}i=i+1; }  for(h=0,h<2){for(l=0,l<2){ print(c[h,l]); l=l+1;} h=h+1;}  } func void main(){int x[2][2],y[2][2];  x[0,0] = 7; x[0,1] = 5; x[1,0] = 6; x[1,1] = 3; y[0,0] = 2; y[0,1] = 1; y[1,0] = 5; y[1,1] =1; :multiplyMatrixes(x,y); }";
const code: string = "func void multiplyMatrixes(int x[2][2],int y[2][2]){  int c[2][2]; for(i=0,i<2){for(j=0,j<2){ c[i,j]=0; for(k=0,k<2){c[i,j] = c[i,j] + x[i,k] * y[k,j]; k=k+1; } j=j+1;}i=i+1; }  for(h=0,h<2){for(l=0,l<2){ print(c[h,l]); l=l+1;} h=h+1;}  } func void main(){int x[2][2],y[2][2];  x[0,0] = 7; x[0,1] = 5; x[1,0] = 6; x[1,1] = 3; y[0,0] = 2; y[0,1] = 1; y[1,0] = 5; y[1,1] =1; :multiplyMatrixes(x,y); }";
                                                                                                                                                                                              // for (i = 0; i < n; i++) {
                                                                                                                                                                                              //   for (j = 0; j < n; j++) {
                                                                                                                                                                                              //       printf("%d\t", c[i][j]);
                                                                                                                                                                                              //   }
                                                                                                                                                                                              //   printf("\n");
                                                                                                                                                                                              // }
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
