const { getVariableValue,assignVariableValue,getCodeSegmentIndex,loadFunction,resetMemory,getArrayVariableValue } = require("./memoryUtils");
const {getFunctionQuadruples} = require("./functionUtils");
var readlineSync = require('readline-sync');
let memoryStack = [];
let quadrupleStack = [];
let functionCalled = null;
let parameterValues = [];
let devMode = false
function logger(string,object)
{
    if(devMode === true)
    {
        console.log(string,object ?? "")
    }
}
 async function  solveOperation  (quadruples,currentQuadruple,functions,memory,global,logging=false)
{
    devMode=logging;
    let quadruple = memory.codeSegment[currentQuadruple];
    if(quadruple === null || quadruple === undefined)
    {
        logger("quadruple was not found",global);
        return {currentQuadruple:undefined,global};
    }
    
    logger("Current Quadruple: ",quadruple);
    switch (quadruple.operator){
        case "+":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand + rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})+${rightOperand}(${quadruple.rightOperand})=${result}(${quadruple.result})`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "-":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand - rightOperand;
            logger(`${leftOperand}-${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "/":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand / rightOperand;
            logger(`${leftOperand}/${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "*":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand * rightOperand;
            logger(`${leftOperand}*${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "=":
        {
            const [value,assignmentOperand] = getAssignmentOperands(quadruple);
            logger(`${assignmentOperand}(address)=${value}`);
            // yo se es 1008 pero deberia ser quadruple.operand el que tiene el valor de address
            assignVariableValue(assignmentOperand,value);
        }
        break;
        case "==":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand === rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})==${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "!=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand !== rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})!=${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "<":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand < rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})<${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case ">":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand > rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})>${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case ">=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand >= rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})>=${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "<=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand <= rightOperand;
            logger(`${leftOperand}(${quadruple.leftOperand})<=${rightOperand}(${quadruple.rightOperand}) => ${result}(quadruple.result)`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "VER":
        {
            const [operand,upperLimit] = getVerificationOperands(quadruple);
            if(!(operand <= (upperLimit-1) && operand >= 0))
            {
                throw new Error("Array index is out of bounds");
            }
        }
        break;
        case "ERA":
        {
            // TODO: check if function name will have an address?
            const functionName = quadruple.functionName;
            functionCalled = functions.find(func => func.name === functionName);
            parameterValues = [];
        }
        break;
        case "PARAM":
        {
            const value = getParamOperands(quadruple,parameterValues);
            logger(value,"para el parametro")
            if (typeof value === 'string' || value instanceof String)
            {
                parameterValues.push(value);
            }
            else if(value.length !== null && value.length !== undefined)
            {
                value.forEach(innerValue => {
                    parameterValues.push(innerValue);
                })
            }else {
                parameterValues.push(value);
            }
        }
        break;
        case "GOSUB":
        {
             // take screenshot
             logger(memory.stackSegment,"stack segment");
             logger(memory.extraSegment,"extra Segment");
             // check copy of code segment is working
             memoryStack.push({stackSegment:{...memory.stackSegment},extraSegment:{...memory.extraSegment},codeSegment:[...memory.codeSegment]})
             quadrupleStack.push({lastQuadruple:currentQuadruple,wasGlobal:global});
             logger("screenshot memory: ", memoryStack[memoryStack.length - 1]);
             logger("left a breadcrum at: " ,quadrupleStack[quadrupleStack.length -1])
             let functionQuadruples = getFunctionQuadruples(functionCalled.quadruplesStart,quadruples);
             loadFunction(functionCalled,parameterValues,functionQuadruples);
             parameterValues = [];
             return {currentQuadruple:0,global:false};
        }
        break;
        case "ENDFUNC":
        {
            let qStack = quadrupleStack.pop();
            if(qStack === undefined || qStack === null)
            {
                logger("The program ended");
                return {currentQuadruple:null,global};
            }else {
                let lastMemory = memoryStack.pop();
                resetMemory(lastMemory);
                return {currentQuadruple:qStack.lastQuadruple+1,global:qStack.StackwasGlobal};
            }
        }
        break;
        case "RETURN":
        {
            assignFunctionVariable(quadruple)
            // save global var with the function name as the value of return 
            let qStack = quadrupleStack.pop();
            if(qStack === undefined || qStack === null)
            {
                logger("The program ended");
                return {currentQuadruple:null,global};
            }else {
                let lastMemory = memoryStack.pop();
                resetMemory(lastMemory);
                
                return {currentQuadruple:qStack.lastQuadruple+1,global:qStack.wasGlobal};
            }
        }
        break;
        case "GOTO":    
        {
            let arrayIndex = getCodeSegmentIndex(quadruple.address);
            return {currentQuadruple:arrayIndex,global}
        }
        break;
        case "GOTOF":
        {
            const value = getVariableValue(quadruple.value);
            if(!value)
            {
                let arrayIndex = getCodeSegmentIndex(quadruple.address);
                return {currentQuadruple:arrayIndex,global};
            }
        }
        break;
        case "GOTOT":
            {
                const value = getVariableValue(quadruple.value);
                if(value)
                {
                    let arrayIndex = getCodeSegmentIndex(quadruple.address);
                    return {currentQuadruple:arrayIndex,global};
                }
            }
        break;
        case "READ":
        {
            let readingAddress = quadruple.value;
            if (quadruple.value >= 17000 && quadruple.value <= 20999)
            {  
                readingAddress = getVariableValue(readingAddress);
                logger("Actual Read Value:",readingAddress);    
            }
            let readLabel = createReadLabel(quadruple.label);
            // get name of variable
            let answer =  readlineSync.question(`${readLabel}: \n`);
            logger(`Read ${readingAddress}: ${answer}`);
            // Todo check input is type of value
            checkInputIsCorrectType(quadruple.type,answer)
            assignVariableValue(readingAddress,answer);
        }
        break;
        case "PRINT":
        {
            valueAddress = quadruple.value;
            if(quadruple.value.negative)
            {
                valueAddress = quadruple.value.address;
            }
            let value = getVariableValue(valueAddress)
            if (valueAddress >= 17000 && valueAddress <= 20999)
            {  
                value = getVariableValue(value);
                logger("Actual Print Operand:",value);    
            }
            if(quadruple.value.negative)
            {
                value = value*-1;
            }
            console.log("System Out: ",value);
        }
        break;
    }
    return {currentQuadruple:currentQuadruple+1,global};
}

function getOperationOperands(quadruple)
{
    let leftOperand = null;
    let rightOperand = null;
    let leftOperandAddress = quadruple.leftOperand;
    let leftOperandNegative = false; 
    if(quadruple.leftOperand.negative)
    {
        leftOperandAddress = quadruple.leftOperand.address;
        leftOperandNegative = true;
    }
    let rightOperandAddress = quadruple.rightOperand;
    let rightOperandNegative = false; 
    if(quadruple.rightOperand.negative)
    {
        rightOperandAddress = quadruple.rightOperand.address;
        rightOperandNegative = true;
    }
    if (leftOperandAddress >= 17000 && leftOperandAddress <= 20999)
    {  
        leftOperand = getVariableValue(getVariableValue(leftOperandAddress));
        logger("Actual Left Operand:",leftOperand);    
    }else {
        leftOperand = getVariableValue(leftOperandAddress);
    }
    if (rightOperandAddress >= 17000 && rightOperandAddress <= 20999)
    {  
        rightOperand = getVariableValue(getVariableValue(rightOperandAddress));
        logger("Actual Right Operand:",rightOperand);    
    }else {
        rightOperand = getVariableValue(rightOperandAddress);
    }
    if(leftOperand === null)
    {
        logger("Left Operand is null");
        throw new Error("Left Operand is null")
    }
    if(rightOperand === null)
    {
        logger("Right Operand is null");
        throw new Error("Right Operand is null")
    }
    if (leftOperandNegative)
    {
        leftOperand = leftOperand * -1;
    }
    if (rightOperandNegative)
    {
        rightOperand = rightOperand * -1;
    }
    return [leftOperand,rightOperand];
}
function getAssignmentOperands(quadruple)
{
    let valueAddress = quadruple.value;
    let valueNegative = false;
    if(quadruple.value.negative)
    {
        valueAddress = quadruple.value.address;
        valueNegative = true;
    }
    // check if assigning an array value is possible
    // maybe the quadruple.operand >= 17000 logic needs to happen also
    let value = getVariableValue(valueAddress);
    if( valueAddress >= 17000 && valueAddress <= 20999)
    {
        value = getVariableValue(value);
        logger("Actual Assignment Value:",value);
    }
    let assignmentOperand = quadruple.operand;
    if (quadruple.operand >= 17000 && quadruple.operand <= 20999)
    {  
        assignmentOperand = getVariableValue(assignmentOperand);
        logger("Actual Assignment Operand:",assignmentOperand);    
    }
    if(valueNegative)
    {
        value = value*-1;
    }
    return [value,assignmentOperand];
}
function getVerificationOperands(quadruple)
{
    let operandAddress = quadruple.operand;
    let operandNegative = false; 
    if(quadruple.operand.negative)
    {
        operandAddress = quadruple.operand.address;
        operandNegative = true;
    }
    let operand = getVariableValue(operandAddress);
    if (operandAddress >= 17000 && operandAddress <= 20999)
    {  
        operand = getVariableValue(operand);
        logger("Actual Verification Operand:",operand);    
    }
    // check if upper limit should be a constant
    const upperLimit = quadruple.upperLimit //getVariableValue(quadruple.upperLimit);
    if(operandNegative)
    {
        operand = operand*-1;
    }
    return [operand,upperLimit];
}
function assignFunctionVariable(quadruple)
{
    let functionVar = functionCalled.globalAddress;
    let valueAddress = quadruple.value;
    let valueNegative = false;
    if(quadruple.value.negative)
    {
        valueAddress = quadruple.value.address;
        valueNegative = true;
    }
    let returnValue = getVariableValue(valueAddress);
    if (valueAddress >= 17000 && valueAddress <= 20999)
    {  
        returnValue = getVariableValue(returnValue);
        logger("Actual Function Return Operand:",returnValue);    
    }
    // TODO: Check if functionVar is an existing variable (should be)
    if(valueNegative)
    {
        returnValue = returnValue*-1;
    }
    assignVariableValue(functionVar,returnValue);
}
function getParamOperands(quadruple)
{
    let valueAddress = quadruple.value;
    let valueNegative = false;
    if(quadruple.negative)
    {
        valueAddress=quadruple.value.address;
        valueNegative = true;
    }
    if(quadruple.m0)
    {
        let values = getArrayVariableValue(valueAddress,quadruple.m0);
        return values;
    }
    let value = getVariableValue(valueAddress);
    if (valueAddress >= 17000 && valueAddress <= 20999)
    {  
        value = getVariableValue(value);
        logger("Actual Param Operand:",value);    
    }
    if(valueNegative)
    {
        value = value*-1;
    }
    return value;
}
function checkInputIsCorrectType(type,value)
{
    switch(type)
    {
        case 1:
        case 2: 
        {
            if(isNaN(value))
            {
                console.log(`Value should be ${type}`);
                throw new Error(`Value should be ${type}`);
            }
            if(type === 1 && Number.isInteger(Number(value)) === false)
            {
                console.log(`Value should be ${type}, no decimals`)
                throw new Error(`Value should be ${type}, no decimals`);
            }

        }
        break;
        case 4:
        {
            if(value !== "true" && value !== "false")
            {
                console.log(`Value should be ${type}, true or false`);
                throw new Error(`Value should be ${type}, true or false`);
            }
        }


    }
}
function createReadLabel(labelVar)
{
    if(labelVar.dimensions !== null && labelVar.dimensions !== undefined)
    {
        let arrayLabel = labelVar.label;
        labelVar.dimensions.forEach(dimension => {
            if(dimension.variable !== true)
            {

                arrayLabel += `[${dimension.label}]`;
            }else {
                // TODO: Add logic to get current value of that dimension index to show
                const value = getVariableValue(dimension.address);
                if (dimension.address >= 17000 && dimension.address <= 20999)
                {  
                    value = getVariableValue(value);
                    logger("Actual Param Operand:",value);    
                }
                arrayLabel += `[${value}]`;
            }
        })
        return arrayLabel;
    }
    return labelVar;
}
module.exports = {solveOperation};