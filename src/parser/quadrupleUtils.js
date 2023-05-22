const { semanticTable } = require("./semanticTable");
const { createVariable } = require("./variableUtils");
export function getOperands(operandStack, operatorStack, typeStack) {
  const rightOperand = operandStack.pop();
  const rightType = typeStack.pop();
  const leftOperand = operandStack.pop();
  const leftType = typeStack.pop();
  const operator = operatorStack.pop();
  return [rightOperand, rightType, leftOperand, leftType, operator];
}

export function createAssignmentQuad(
  quadruples,
  operandStack,
  operatorStack,
  typeStack
) {
  var [rightOperand, rightType, leftOperand, leftType, operator] = getOperands(
    operandStack,
    operatorStack,
    typeStack
  );
  // add more validations later but for now strict typing
  if (rightType != leftType) {
    console.log("Operation", leftType, operator, rightType, "is not valid");
    throw new Error("Operation is not valid");
  }
  console.log(
    `${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})`
  );
  quadruples.push({
    operator: operator,
    operand: leftOperand,
    result: rightOperand,
  });
}

export function createOperationQuad(
  quadruples,
  operandStack,
  operatorStack,
  typeStack,
  nextAvail,
  thisFunction
) {
  var [rightOperand, rightType, leftOperand, leftType, operator] = getOperands(
    operandStack,
    operatorStack,
    typeStack
  );
  var resultType = semanticTable[leftType][operator][rightType];
  if (resultType === undefined) {
    console.log("Operation", leftType, operator, rightType, "is not valid");
    throw new Error("Operation is not valid");
  }
  var result = nextAvail();
  console.log(
    `${leftOperand}(${leftType})${operator}${rightOperand}(${rightType})=${result}(${resultType})`
  );
  createVariable(result, resultType, thisFunction, "temporal");
  quadruples.push({
    operator: operator,
    leftOperand: leftOperand,
    rightOperand: rightOperand,
    result: result,
  });
  operandStack.push(result);
  typeStack.push(resultType);
}
