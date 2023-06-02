import { createOperationQuad } from "./quadrupleUtils";
import {createConstantVariable} from "./variableUtils";
export function createDimensionQuad(
    arrayCalled,
    currentDimension,
    currentArrayCallIndex,
    quadruples,
    operandStack,
    operatorStack,
    typeStack,
    nextAvail,
    thisFunction,
    mainFunction
  ) {
    var operand = operandStack[operandStack.length -1];
    var operandType = typeStack[typeStack.length -1];
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
      global:thisFunction.global === true
    });
    if(Object.hasOwn(arrayCurrentDimension, 'm'))
    {
        operatorStack.push("*");
        let constantVarAddress = createConstantVariable(arrayCurrentDimension.m,"int", mainFunction)
        console.log(constantVarAddress, "constantVar created");
        operandStack.push(constantVarAddress);
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
        let constantVarKAddress = createConstantVariable(arrayCurrentDimension.k,"int", mainFunction)
        operandStack.push(constantVarKAddress );
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction);
        
        operatorStack.push("+");
        let constantArrayBaseAddress = createConstantVariable(arrayCalled.address,"int", mainFunction)
        operandStack.push(constantArrayBaseAddress);
        typeStack.push("int");
        createOperationQuad(quadruples,operandStack,operatorStack,typeStack,nextAvail,thisFunction,true);
    }

  }

export function checkArraysDimensionsMatch(baseArray,argumentArray)
{
    let x = 0;
    if(baseArray.dimensions.length !== argumentArray.dimensions.length)
    {
        console.log("Arrays dimensions length do not match");
        throw new Error("Arrays dimensions length do not match");
    }
    while(x<baseArray.dimensions.length)
    {
        if(baseArray.dimensions[x] !== argumentArray.dimensions[x].upperLimit)
        {
            console.log("Arrays dimensions sizes do not match");
            throw new Error("Arrays dimensions sizes do not match");
        }
        x++;
    }
}