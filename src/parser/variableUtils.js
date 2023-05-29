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

export function createVariable(name, type, currentFunction, varType = "local") {
  if (currentFunction.variables.some((variable) => variable.name === name)) {
    console.log("Name is already taken", name);
    throw new Error(name, "name is already taken");
  }
  // add logic to add starting adddress
  let address = 1000;
  currentFunction.variables.push({
    type,
    name,
    address,
    varType:
      currentFunction.name == "main" && varType == "local" ? "global" : varType,
  });
}

// di = ls -li +1 en este caso nos alinemos con c y el limite inferios siempr es 0
// m1  = d2*d3... dn
// m2 = d3*d4...dn
// mn-1 = dn
// mn =1
// dirB9(id) + s1 *m1 + s2*m2 + sn 
// la ultima direccion siempre va pelon
// la primera dimension es la que multiplica todas las dimensiones
// la seguna una menos
// acumulado de la multiplicacion de las dimensiones invirtiendo el arreglo es mas facil calcularlo el primer valor no tiene dimensiones a la der



export function createArrayVariable(array, currentFunction, varType = "local") {
  if (currentFunction.variables.some((variable) => variable.name === array.name)) {
    console.log("Name is already taken", array.name);
    throw new Error(name, "name is already taken");
  }
  let m0 = array.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1)
  let dimension =  0;
  let m = m0;
  while(dimension < array.dimensions.length)
  {
    m = m/Number(array.dimensions[dimension].upperLimit);
    array.dimensions[dimension].m = m;
    dimension++;
  }
  array.dimensions[array.dimensions.length-1]['k'] = array.dimensions[array.dimensions.length-1]['m'] * -1;
  delete array.dimensions[array.dimensions.length-1]['m'];
  array.varType = currentFunction.name == "main" && varType == "local" ? "global" : varType;
  array.address = 2000;
  // add logic for the upper limits?
  currentFunction.variables.push(array);
}

export function accessArrayValue(array,indexes)
{
  let cell=0;
  array.forEach(dimension => {
    index = indexes.pop();
    if(index === null || index === undefined)
    {
      console.log("Array has more dimensions that the ones specified");
      throw new Error("array has more dimensions that the ones specified");
    }
    if(Object.hasOwn(dimension, 'k'))
    {
      cell += index;
    }else{
      cell += dimension.m * index;
    }
  })
  return cell;
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
      address:3000,
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
