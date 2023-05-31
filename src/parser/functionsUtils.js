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

export function finishFunction(thisFunction, quadruples) {
  thisFunction.size = getFunctionSize(thisFunction.variables);
  quadruples.push({
    operator: "ENDFUNC",
  });
}

export function createReturnVar(
  thisFunction,
  typeStack,
  operandStack,
  quadruples,
) {
  var rightOperand = operandStack.pop();
  var rightType = typeStack.pop();
  var leftType = thisFunction.returnType;
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
