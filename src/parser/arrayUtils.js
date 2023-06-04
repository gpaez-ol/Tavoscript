const { createOperationQuad } = require("./quadrupleUtils");
const {createConstantVariable, getVariableByAddress} = require("./variableUtils");
function createDimensionQuad(
    arrayCalled,
    currentDimension,
    currentArrayCallIndex,
    quadruples,
    operandStack,
    typeStack,
    nextAvail,
    functions,
    currentFunction
  ) {
    let thisFunction = functions[currentFunction];
    let mainFunction = functions[0];
    var operand = operandStack[operandStack.length -1];
    var operandType = typeStack[typeStack.length -1];
    console.log("Operand Type",operandType);
    if(operandType !== 1)
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
    let operandVariable = getVariableByAddress(operand,functions,currentFunction);
    if(Object.hasOwn(arrayCurrentDimension, 'm'))
    {
        let constantVarAddress = createConstantVariable(arrayCurrentDimension.m,1, mainFunction)
        operandStack.push(constantVarAddress);
        typeStack.push(1);
        createOperationQuad(quadruples,operandStack,"*",typeStack,nextAvail,thisFunction);
        if(currentArrayCallIndex === undefined || currentArrayCallIndex === null)
        {
            // Constant Var Type = 9
            if (operandVariable.varType === "constant")
            {
                return {label:operandVariable.name}
            } else {
                console.log(operandVariable);
                return {address:operandVariable.address,variable:true}
            }
        }

    }
    if(currentArrayCallIndex !== undefined && currentArrayCallIndex !== null){
        operandStack.push(currentArrayCallIndex);
        typeStack.push(1);
        createOperationQuad(quadruples,operandStack,"+",typeStack,nextAvail,thisFunction);
    }
    if(Object.hasOwn(arrayCurrentDimension, 'k'))
    {
        let constantVarKAddress = createConstantVariable(arrayCurrentDimension.k,1, mainFunction)
        operandStack.push(constantVarKAddress );
        typeStack.push(1);
        createOperationQuad(quadruples,operandStack,"+",typeStack,nextAvail,thisFunction);

        let constantArrayBaseAddress = createConstantVariable(arrayCalled.address,1, mainFunction)
        operandStack.push(constantArrayBaseAddress);
        typeStack.push(1);
        createOperationQuad(quadruples,operandStack,"+",typeStack,nextAvail,thisFunction,true);
    }
    // Constant Var Type = 9
    if (operandVariable.varType === "constant")
    {
        return {label:operandVariable.name}
    } else {
        return {address:operandVariable.address,variable:true}
    }
  }

function checkArraysDimensionsMatch(baseArray,argumentArray)
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
module.exports = {createDimensionQuad,checkArraysDimensionsMatch};