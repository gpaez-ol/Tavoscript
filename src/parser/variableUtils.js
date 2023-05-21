// codigo de operacion
/*
    + 
    -
    /
    *
    =
    >
    <
    >=
    <=
    ==
    !=
    &&
    ||
*/
// variable global int = 1000
let vgi = 1000;
// variable global float = 2000
let vgf = 2000;
// variable global string = 3000
let vgs = 3000;
// variable global booleana = 4000
let vgb = 4000;

// variable local int = 5000
// se resetean cada modulo
const vli = 5000;
// variable local float = 6000
const vlf = 6000;
// variable local string = 7000
const vls = 7000;
// variable local boolean = 8000
const vlb = 8000;

// temporales t1,t2,t3 cuando se estan resolviendo ecuaciones
// se resetean en cada modulo
// variable temporales int = 9000
const vti = 9000;
// variable temporales float = 10000
const vtf = 10000;
// variable temporales string = 11000
const vts = 11000;
// variable temporales boolean = 12000
const vtb = 12000;

// constantes int = 13000
const vci = 13000;
// constantes float = 14000
const vcf = 14000;
// constantes string = 15000
const vcs = 15000;
// constantes boolean = 16000
const vcb = 16000;

// this is the module class

function createModule() {
  return [vli, vlf, vls, vlb, vti, vtf, vts, vtb, vci, vcf, vcs, vcb];
}

export function createVariable(name, type, currentFunction, varType = "local") {
  if (currentFunction.variables.some((variable) => variable.name === name)) {
    console.log("Name is already taken", name);
    throw new Error(name, "name is already taken");
  }
  currentFunction.variables.push({
    type,
    name,
    varType:
      currentFunction.name == "main" && varType == "local" ? "global" : varType,
  });
  // checar si la variable es local
  // si no es local checar la global
  //   switch (type) {
  //     case "int":
  //       break;
  //     case "float":
  //       break;
  //     case "string":
  //       break;
  //     case "bool":
  //       break;
  //   }
  // variables.push({ type: currentType, name: $1,address:10000 });
}

export function createConstantVariable(name, type, mainFunction) {
  if (
    !mainFunction.variables.some(
      (variable) => variable.name === name && variable.type === type
    )
  ) {
    mainFunction.variables.push({
      type,
      name,
      varType: "constant",
    });
  }
  // checar si la variable es local
  // si no es local checar la global
  //   switch (type) {
  //     case "int":
  //       break;
  //     case "float":
  //       break;
  //     case "string":
  //       break;
  //     case "bool":
  //       break;
  //   }
  // variables.push({ type: currentType, name: $1,address:10000 });
}

export function getVariable(name, functions, currentFunction) {
  // check local vars
  let funcVar = functions[currentFunction].variables.find(
    (variable) => variable.name === name
  );
  if (funcVar === undefined || funcVar === null) {
    // check global vars and constants
    funcVar = functions[0].variables.find((variable) => variable.name === name);
    if (funcVar === undefined || funcVar === null) {
      console.log(`Variable ${name} does not exist at this point in time.`);
      throw new Error(`Variable ${name} does not exist at this point`);
    }
  }
  return funcVar;
}
