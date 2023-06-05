const { semanticTable } = require("./semanticTable");
const { createVariable, getVariableByAddress } = require("./variableUtils");
const {getKey} = require("./mainAddresses");
function getOperands(operandStack,typeStack) {
  const rightOperand = operandStack.pop();
  const rightType = typeStack.pop();
  const leftOperand = operandStack.pop();
  const leftType = typeStack.pop();
  return [rightOperand, rightType, leftOperand, leftType];
}


function createPrintQuad(
  quadruples,
  operandStack,
  typeStack,
) {
  var printValue = operandStack.pop();
  typeStack.pop();
  quadruples.push({
    id:quadruples.length,
    operator: "PRINT",
    value: printValue,
  });
}

// should be address
function createReadQuad(
  quadruples,
  operandStack,
  typeStack
) {
  var readValue = operandStack.pop();
  var readType = typeStack.pop();
  quadruples.push({
    id:quadruples.length,
    operator: "READ",
    value: readValue.address,
    type: readType,
    label:readValue.label
  });
}




function createAssignmentQuad(
  quadruples,
  operandStack,
  typeStack,
  global
) {
  var [rightOperand, rightType, leftOperand, leftType] = getOperands(
    operandStack,
    typeStack
  );
  // add more validations later but for now strict typing
  if (rightType != leftType && !(rightType === 1 && leftType === 2)) {
    console.log("Operation", getKey(leftType), "=", getKey(rightType), "is not valid");
    throw new Error("Operation is not valid");
  }
  quadruples.push({
    id:quadruples.length,
    operator: "=",
    operand: leftOperand,
    value: rightOperand,
    global:global === true
  });
}

function createOperationQuad(
  quadruples,
  operandStack,
  operator,
  typeStack,
  nextAvail,
  thisFunction,
  pointer = false
) {
  var [rightOperand, rightType, leftOperand, leftType] = getOperands(
    operandStack,
    typeStack
  );
  var resultType = semanticTable[leftType][operator][rightType];
  if (resultType === undefined) {
    console.log("Operation", getKey(leftType), operator, getKey(rightType), "is not valid");
    throw new Error("Operation is not valid");
  }
  var result = nextAvail(pointer);
  // Temporal Values = 8  // Pointer Var Type = 10
  let newVariable = createVariable(result, resultType, thisFunction, pointer ? 10 : 8);
  quadruples.push({
    id:quadruples.length,
    operator: operator,
    leftOperand: leftOperand,
    rightOperand: rightOperand,
    result: newVariable.address,
    global: thisFunction.global === true
  });
  operandStack.push(newVariable.address);
  typeStack.push(resultType);
}

module.exports = {getOperands,createPrintQuad,createReadQuad,createAssignmentQuad,createOperationQuad}