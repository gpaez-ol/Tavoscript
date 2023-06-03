const { getVariableValue,assignVariableValue,loadFunction,resetMemory,getArrayVariableValue } = require("./memoryUtils");
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
    let quadruple = quadruples[currentQuadruple];
    if(global)
    {
        quadruple = quadruples.filter(quadruple => quadruple.global === true)[currentQuadruple];    
    }   
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
             memoryStack.push({stackSegment:{...memory.stackSegment},extraSegment:{...memory.extraSegment}})
             quadrupleStack.push({lastQuadruple:currentQuadruple,wasGlobal:global});
             logger("screenshot memory: ", memoryStack[memoryStack.length - 1]);
             logger("left a breadcrum at: " ,quadrupleStack[quadrupleStack.length -1])
             loadFunction(functionCalled,parameterValues);
             parameterValues = [];
             return {currentQuadruple:functionCalled.quadruplesStart,global:false};
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
            const address = quadruple.address;
            return {currentQuadruple:address,global}
        }
        break;
        case "GOTOF":
        {
            const address = quadruple.address;
            const value = getVariableValue(quadruple.value);
            if(!value)
            {
                return {currentQuadruple:address,global};
            }
        }
        break;
        case "GOTOT":
            {
                const address = quadruple.address;
                const value = getVariableValue(quadruple.value);
                if(value)
                {
                    return {currentQuadruple:address,global};
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
            let value = getVariableValue(quadruple.value)
            if (quadruple.value >= 17000 && quadruple.value <= 20999)
            {  
                value = getVariableValue(value);
                logger("Actual Print Operand:",value);    
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
    if (quadruple.leftOperand >= 17000 && quadruple.leftOperand <= 20999)
    {  
        leftOperand = getVariableValue(getVariableValue(quadruple.leftOperand));
        logger("Actual Left Operand:",leftOperand);    
    }else {
        leftOperand = getVariableValue(quadruple.leftOperand);
    }
    if (quadruple.rightOperand >= 17000 && quadruple.rightOperand <= 20999)
    {  
        rightOperand = getVariableValue(getVariableValue(quadruple.rightOperand));
        logger("Actual Right Operand:",rightOperand);    
    }else {
        rightOperand = getVariableValue(quadruple.rightOperand);
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
    return [leftOperand,rightOperand];
}
function getAssignmentOperands(quadruple)
{
    // check if assigning an array value is possible
    // maybe the quadruple.operand >= 17000 logic needs to happen also
    let value = getVariableValue(quadruple.value);
    if( quadruple.value >= 17000 && quadruple.value <= 20999)
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
    return [value,assignmentOperand];
}
function getVerificationOperands(quadruple)
{
    let operand = getVariableValue(quadruple.operand);
    if (quadruple.operand >= 17000 && quadruple.operand <= 20999)
    {  
        operand = getVariableValue(operand);
        logger("Actual Verification Operand:",operand);    
    }
    // check if upper limit should be a constant
    const upperLimit = quadruple.upperLimit //getVariableValue(quadruple.upperLimit);
    return [operand,upperLimit];
}
function assignFunctionVariable(quadruple)
{
    let functionVar = functionCalled.globalAddress;
    let returnValue = getVariableValue(quadruple.value);
    if (quadruple.value >= 17000 && quadruple.value <= 20999)
    {  
        returnValue = getVariableValue(returnValue);
        logger("Actual Function Return Operand:",returnValue);    
    }
    // TODO: Check if functionVar is an existing variable (should be)
    assignVariableValue(functionVar,returnValue);
}
function getParamOperands(quadruple)
{
    if(quadruple.m0)
    {
        let values = getArrayVariableValue(quadruple.value,quadruple.m0);
        return values;
    }
    let value = getVariableValue(quadruple.value);
    if (quadruple.value >= 17000 && quadruple.value <= 20999)
    {  
        value = getVariableValue(value);
        logger("Actual Param Operand:",value);    
    }
    return value;
}
function checkInputIsCorrectType(type,value)
{
    switch(type)
    {
        case "int":
        case "float": 
        {
            if(isNaN(value))
            {
                console.log(`Value should be ${type}`);
                throw new Error(`Value should be ${type}`);
            }
            if(type === "int" && Number.isInteger(Number(value)) === false)
            {
                console.log(`Value should be ${type}, no decimals`)
                throw new Error(`Value should be ${type}, no decimals`);
            }

        }
        break;
        case "bool":
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