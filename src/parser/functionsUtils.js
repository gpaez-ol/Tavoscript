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
  // Local Var Type = 6,  // Parameter Var Type = 11
  variables
    .filter(
      (variable) =>
        variable.varType == 6 || variable.varType == 11
    )
    .forEach((variable) => {
      switch (variable.type) {
        case 1:
          vli = vli + 1;
          break;
        case 2:
          vlf = vlf + 1;
          break;
        case 3:
          vls = vls + 1;
          break;
        case 4:
          vlb = vlb + 1;
          break;
      }
    });
  // Temporal Values = 8
  variables
    .filter((variable) => variable.varType == 8)
    .forEach((variable) => {
      switch (variable.type) {
        case 1:
          vti = vti + 1;
          break;
        case 2:
          vtf = vtf + 1;
          break;
        case 3:
          vts = vts + 1;
          break;
        case 4:
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
    id:quadruples.length,
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
  if (rightType != leftType && !(rightType === 1 && leftType === 2)) {
    console.log(`Function return Type should be ${leftType}`);
    throw new Error(`Function return type should be ${leftType}`);
  }
  // aqui podria ser la variable global con el mismo nombre que la funcion
  quadruples.push({
    id:quadruples.length,
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
      if(argumentArray.type !== currentParam.type && !(currentParam.type === 2 && argumentArray.type === 1))
      {
        throw new Error(`Array Type should be ${currentParam.type}`);
      }
      // TODO: Add logic to check both dimensions match
      checkArraysDimensionsMatch(currentParam,argumentArray)
      let argumentM0 = argumentArray.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1);
      quadruples.push({id:quadruples.length,operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0,m0:argumentM0});
      return;
    }
  let argument = getVariableByAddress(operand,functions,currentFunction);
  if(argument.dimensions)
  {
    console.log("Function Argument cannot be an array");
    throw new Error("Function Argument cannot be an array");
  }
  if(operandType !== currentParam && !(operandType === 1 && currentParam === 2))
  {
      console.log(`Type should be ${currentParam}`);
      throw new Error(`Type should be ${currentParam}`);
  }
  quadruples.push({id:quadruples.length,operator:"PARAM",value:operand,param:functionCallCurrentParam,global:currentFunction === 0});
}
module.exports = {finishFunction,createReturnVar,checkParams};