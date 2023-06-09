const { startingAddresses,validateAddress } = require("./mainAddresses");

let availableAddresses = JSON.parse(JSON.stringify(startingAddresses));

function resetAvailableAddresses()
{
  // Global Var Type = 7
  let currentGlobalAddress = {...availableAddresses[7]};
  // Const Var Type = 9
  let currentConst = {... availableAddresses[9]};
  availableAddresses = JSON.parse(JSON.stringify(startingAddresses));
  availableAddresses[7] = currentGlobalAddress;
  availableAddresses[9] = currentConst;
}

function assignAddress(variable,m0=null){
  // check that the new address is within the valid range
  let availableAddress = Number(availableAddresses[variable.varType][variable.type]);
  if(m0 != null && variable.dimensions !== null && variable.dimensions !== undefined)
  {
    let lastUsedAddress = availableAddress + Number(m0)-1;
    validateAddress(lastUsedAddress,variable.varType,variable.type);
    availableAddresses[variable.varType][variable.type] += Number(m0);
  }else {
    validateAddress(availableAddress,variable.varType,variable.type);
    availableAddresses[variable.varType][variable.type]++;
  }
  return availableAddress;
}

function createVariable(name, type, currentFunction, varType = 6) {
  if (varType === 6 &&  currentFunction.variables.some((variable) => variable.name === name)) {
    console.log("Name is already taken", name);
    throw new Error(name, "name is already taken");
  }
  let variable = {
    type,
    name,
    address:null,
    varType,varType:
    currentFunction.global === true && varType == 6 ? 7 : varType,
  }
  if(variable.type !== 5)
  {
    variable.address = assignAddress(variable);
  }else {
    delete variable.address;
  }
  currentFunction.variables.push(variable);
  return variable;
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



function createArrayVariable(array, currentFunction, varType = 6) {
  if (currentFunction.variables.some((variable) => variable.name === array.name)) {
    console.log("Name is already taken", array.name);
    throw new Error(name, "name is already taken");
  }
  let m0 = array.dimensions.reduce((currentValue,currentDimension) => { return currentValue * (Number(currentDimension.upperLimit))},1)
  let dimension =  0;
  let m = m0;
  while(dimension < array.dimensions.length)
  {
    m = m/(Number(array.dimensions[dimension].upperLimit));
    array.dimensions[dimension].m = m;
    dimension++;
  }
  // opted for traditional base 0 arrays, but if wanted there should be an accum sum that is multiplied by -1
  // mn * lln  + mn *lln (lower limit)
  array.dimensions[array.dimensions.length-1]['k'] = 0 * -1;
  delete array.dimensions[array.dimensions.length-1]['m'];
  array.varType = currentFunction.global === true && varType == 6 ? 7 : varType;
  array.address = assignAddress(array,m0);
  // add logic for the upper limits?
  currentFunction.variables.push(array);
}

function createConstantVariable(name, type, mainFunction) {
  if (
    !mainFunction.variables.some(
      (variable) => variable.name === name && variable.type === type
    )
  ) {
    // Const Var Type = 9
    let newConstantVar = {
      type,
      name,
      address:null,
      varType: 9,
    }
    newConstantVar.address = assignAddress(newConstantVar);
    mainFunction.variables.push(newConstantVar);
    return newConstantVar.address;
  }else {
    let constantVar = mainFunction.variables.find(variable => variable.name === name);
    return constantVar.address;
  }
}

function getVariable(name, functions, currentFunction) {
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

function getVariableByAddress(address,functions,currentFunction)
{
  let funcVar = functions[currentFunction].variables.find(
    (variable) => variable.address !== undefined &&  variable.address === address
  );
  if (funcVar === undefined || funcVar === null) {
    funcVar = functions[0].variables.find((variable) => variable.address !== undefined && variable.address === address);
    if (funcVar === undefined || funcVar === null) {
      console.log(`Variable ${address} does not exist at this point in time.`);
      throw new Error(`Variable ${address} does not exist at this point`);
    }
  }
  return funcVar;
}

function getArrayVariable(name,functions,currentFunction)
{
    let arrayVariable = getVariable(name,functions,currentFunction);
    if(arrayVariable.dimensions === null || arrayVariable.dimensions === undefined)
    {
      arrayVariable = functions[0].variables.find((variable) => variable.name === name);
      if (arrayVariable === undefined || arrayVariable === null) {
        console.log(`Variable ${name} is not an array thus cannot be accessed`);
        throw new Error(`Variable ${name} is not an array thus cannot be accessed`);
      }else if(arrayVariable.dimensions === null || arrayVariable.dimensions === undefined)
      {
        console.log(`Variable ${name} is not an array thus cannot be accessed`);
        throw new Error(`Variable ${name} is not an array thus cannot be accessed`);
      }
      return arrayVariable;
    }
    return arrayVariable;
}
module.exports ={resetAvailableAddresses,createVariable,createArrayVariable,createConstantVariable,getVariable,getVariableByAddress,getArrayVariable};
