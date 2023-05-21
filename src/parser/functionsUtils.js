function getFunctionSize(variables) {
  let vli = 0;
  let vlf = 0;
  let vls = 0;
  let vlb = 0;
  // TODO: Add temporals
  variables.forEach((variable) => {
    switch (variable.type) {
      case "int":
        vli++;
        break;
      case "float":
        vlf++;
        break;
      case "string":
        vls++;
        break;
      case "bool":
        vlb++;
        break;
    }
  });
  return {
    local: { vli, vlf, vls, vlb },
    temporal: { vti: 0, vtf: 0, vts: 0, vtb: 0 },
  };
}

export function finishFunction(thisFunction, mainFunction, quadruples) {
  thisFunction.size = getFunctionSize(thisFunction.variables);
  quadruples.push({
    operator: "ENDFunc",
    leftOperand: null,
    rightOperand: null,
    result: null,
  });
}

export function createReturnVar(
  thisFunction,
  typeStack,
  operandStack,
  quadruples,
  nextAvail
) {
  var rightOperand = operandStack.pop();
  var rightType = typeStack.pop();
  var leftOperand = nextAvail();
  var leftType = thisFunction.returnType;
  var operator = "=";
  if (rightType != leftType) {
    console.log(`Type should be ${leftType}`);
    throw new Error(`Function return type should be ${leftType}`);
  }
  console.log(`${leftOperand}(${leftType})=${rightOperand}(${rightType})`);
  thisFunction.variables.push({ leftType, leftOperand, varType: "temporal" });
  quadruples.push({
    operator: operator,
    leftOperand: leftOperand,
    rightOperand: null,
    result: rightOperand,
  });
}
