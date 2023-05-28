import { createOperationQuad } from "./quadrupleUtils";

export function createDimensionQuad(
    arrayCalled,
    currentDimension,
    currentArrayCallIndex,
    quadruples,
    operandStack,
    operatorStack,
    typeStack,
    nextAvail,
    thisFunction
  ) {
    var operand = operandStack[operandStack.length -1];
    var operandType = typeStack[typeStack.length -1];
    console.log(`Operand: ${operand}, Dimension: ${currentDimension}, Current Index: ${currentArrayCallIndex}`);
    if(operandType !== "int")
    {
        console.log(`Index for ${arrayCalled.name} should be of type int`);
        throw new Error(`Index for ${arrayCalled.name} should be of type int`);
    }
    if(currentDimension > arrayCalled.dimensions.length - 1){
        console.log(`Array ${arrayCalled.name} has only ${arrayCalled.dimensions.length} dimensions`);
        throw new Error(`Array ${arrayCalled.name} has only ${arrayCalled.dimensions.length} dimensions`);
    }
    var arrayCurrentDimension = arrayCalled.dimensions[currentDimension];
    quadruples.push({
      operator: "VER",
      operand,
      upperLimit: arrayCurrentDimension.upperLimit,
    });
    if(Object.hasOwn(arrayCurrentDimension, 'm'))
    {
        operatorStack.push("*");
        operandStack.push(arrayCurrentDimension.m);
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction);
        if(currentArrayCallIndex === undefined || currentArrayCallIndex === null)
        {
            return;
        }

    }
    if(currentArrayCallIndex !== undefined && currentArrayCallIndex !== null){
        operatorStack.push("+");
        operandStack.push(currentArrayCallIndex);
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction);
    }
    if(Object.hasOwn(arrayCurrentDimension, 'k'))
    {
        operatorStack.push("+");
        operandStack.push(arrayCurrentDimension.k);
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction);
        
        operatorStack.push("+");
        operandStack.push(arrayCalled.address);
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction,true);
    }

  }