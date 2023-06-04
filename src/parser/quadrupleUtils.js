const { semanticTable } = require("./semanticTable");
const { createVariable, getVariableByAddress } = require("./variableUtils");
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
  if (rightType != leftType && !(rightType === "int" && leftType === "float")) {
    console.log("Operation", leftType, "=", rightType, "is not valid");
    throw new Error("Operation is not valid");
  }
  quadruples.push({
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
    console.log("Operation", leftType, operator, rightType, "is not valid");
    throw new Error("Operation is not valid");
  }
  var result = nextAvail(pointer);
  let newVariable = createVariable(result, resultType, thisFunction, pointer ? "pointer" : "temporal");
  quadruples.push({
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