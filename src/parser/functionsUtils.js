const { getVariableByAddress}  = require("./variableUtils");
const { checkArraysDimensionsMatch } = require("./arrayUtils");
function getFunctionSize(variables) {
  let vli = 0;
  let vlf = 0;
  let vls = 0;
  let vlb = 0;
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
  if (rightType != leftType && !(rightType === "int" && leftType === "float")) {
    console.log(`Function return Type should be ${leftType}`);
    throw new Error(`Function return type should be ${leftType}`);
  }
  // aqui podria ser la variable global con el mismo nombre que la funcion
  quadruples.push({
    operator: "RETURN",
    value: rightOperand,
  });
}
function checkParams(operand,operandType,currentParam,functionCallCurrentParam,currentFunction,functions,quadruples)
{
  if(currentParam.dimensions !== null && currentParam.dimensions !== undefined)
  {
      let argumentArray = getVariableByAddress(operand,functions,currentFunction);
      if(argumentArray.dimensions === null || argumentArray.dimensions === undefined){
        throw new Error("Function Parameter should be an array");
      }
      if(argumentArray.type !== currentParam.type && !(currentParam.type === "float" && argumentArray.type === "int"))
      {
        throw new Error(`Array Type should be ${currentParam.type}`);
      }
      // TODO: Add logic to check both dimensions match
      checkArraysDimensionsMatch(currentParam,argumentArray)
      let argumentM0 = argumentArray.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1);
      quadruples.push({operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0,m0:argumentM0});
      return;
    }
  let argument = getVariableByAddress(operand,functions,currentFunction);
  if(argument.dimensions)
  {
    console.log("Function Argument cannot be an array");
    throw new Error("Function Argument cannot be an array");
  }
  if(operandType !== currentParam && !(operandType === "int" && currentParam === "float"))
  {
      console.log(`Type should be ${currentParam}`);
      throw new Error(`Type should be ${currentParam}`);
  }
  quadruples.push({operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0});
}
module.exports = {finishFunction,createReturnVar,checkParams};