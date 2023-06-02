const { getVariableByAddress}  = require("./variableUtils");
const { checkArraysDimensionsMatch } = require("./arrayUtils");
function getFunctionSize(variables) {
  let vli = 0;
  let vlf = 0;
  let vls = 0;
  let vlb = 0;
  // TODO: Add temporals
  let vti = 0;
  let vtf = 0;
  let vts = 0;
  let vtb = 0;
  variables
    .filter(
      (variable) =>
        variable.varType == "local" || variable.varType == "parameter"
    )
    .forEach((variable) => {
      switch (variable.type) {
        case "int":
          vli = vli + 1;
          break;
        case "float":
          vlf = vlf + 1;
          break;
        case "string":
          vls = vls + 1;
          break;
        case "bool":
          vlb = vlb + 1;
          break;
      }
    });
  variables
    .filter((variable) => variable.varType == "temporal")
    .forEach((variable) => {
      switch (variable.type) {
        case "int":
          vti = vti + 1;
          break;
        case "float":
          vtf = vtf + 1;
          break;
        case "string":
          vts = vts + 1;
          break;
        case "bool":
          vtb = vtb + 1;
          break;
      }
    });
  return {
    local: { vli, vlf, vls, vlb },
    temporal: { vti, vtf, vts, vtb },
  };
}

function finishFunction(thisFunction, quadruples) {
  thisFunction.size = getFunctionSize(thisFunction.variables);
  quadruples.push({
    operator: "ENDFUNC",
  });
}

function createReturnVar(
  thisFunction,
  typeStack,
  operandStack,
  quadruples,
) {
  var rightOperand = operandStack.pop();
  var rightType = typeStack.pop();
  var leftType = thisFunction.returnType;
  console.log("rightTtype",rightType)
  if (rightType != leftType) {
    console.log(`Type should be ${leftType}`);
    throw new Error(`Function return type should be ${leftType}`);
  }
  console.log(`Return(${leftType})=${rightOperand}(${rightType})`);
  // aqui podria ser la variable global con el mismo nombre que la funcion
  quadruples.push({
    operator: "RETURN",
    value: rightOperand,
  });
}
function checkParams(operand,operandType,currentParam,functionCallCurrentParam,currentFunction,functions,quadruples)
{
  console.log("operand",operand);
  console.log("operandType",operandType);
  console.log("currentParam",currentParam);
  console.log("functionCallCurrentParam",functionCallCurrentParam);
  if(currentParam.dimensions !== null && currentParam.dimensions !== undefined)
  {

    console.log("entro bien la primera vez");
      let argumentArray = getVariableByAddress(operand,functions,currentFunction);
      if(argumentArray.dimensions === null || argumentArray.dimensions === undefined){
        console.log("Function Parameter should be an array");
        throw new Error("Function Parameter should be an array");
      }
      if(argumentArray.type !== currentParam.type)
      {
        console.log(operand,"operand");
        console.log(operandType);
        console.log(currentParam);
        console.log(`Array Type should be ${currentParam.type}`);
        throw new Error(`Array Type should be ${currentParam.type}`);
      }
      // TODO: Add logic to check both dimensions match
      console.log(currentParam);
      checkArraysDimensionsMatch(currentParam,argumentArray)
      console.log(`${functionCallCurrentParam}(${currentParam.type})=${operand}(${operandType.type})`);
      let argumentM0 = argumentArray.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1);
      quadruples.push({operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0,m0:argumentM0});
      return;
    }
  let argument = getVariableByAddress(operand,functions,currentFunction);
  if(argument.dimensions)
  {
    console.log("Function Parameter cannot be an array");
    throw new Error("Function Parameter cannot be an array");
  }
  if(operandType !== currentParam)
  {
      console.log(`Type should be ${currentParam}`);
      throw new Error(`Type should be ${currentParam}`);
  }
  console.log(`${functionCallCurrentParam}(${currentParam})=${operand}(${operandType})`);
  quadruples.push({operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0});
}
module.exports = {finishFunction,createReturnVar,checkParams};