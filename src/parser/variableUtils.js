import { startingAddresses } from "./mainAddresses";

let availableAddresses = JSON.parse(JSON.stringify(startingAddresses));

export function resetAvailableAddresses()
{
  let currentGlobalAddress = {...availableAddresses.global};
  let currentConst = {... availableAddresses.constant};
  availableAddresses = JSON.parse(JSON.stringify(startingAddresses));
  availableAddresses.global = currentGlobalAddress;
  availableAddresses.constant = currentConst;
}

function assignAddress(variable,m0=null){
  let availableAddress = Number(availableAddresses[variable.varType][variable.type]);
  if(m0 != null && variable.dimensions !== null && variable.dimensions !== undefined)
  {
    availableAddresses[variable.varType][variable.type] += Number(m0);
  }else {
    availableAddresses[variable.varType][variable.type]++;
  }
  return availableAddress;
}

export function createVariable(name, type, currentFunction, varType = "local") {
  if (currentFunction.variables.some((variable) => variable.name === name)) {
    console.log("Name is already taken", name);
    throw new Error(name, "name is already taken");
  }
  let variable = {
    type,
    name,
    address:null,
    varType,varType:
    currentFunction.name == "main" && varType == "local" ? "global" : varType,
  }
  variable.address = assignAddress(variable);
  currentFunction.variables.push(variable);
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
  array.address = assignAddress(array,m0);
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
