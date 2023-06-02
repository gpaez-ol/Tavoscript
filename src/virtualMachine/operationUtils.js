const { getVariableValue,assignVariableValue,loadFunction,resetMemory,getArrayVariableValue } = require("./memoryUtils");
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
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
export function solveOperation  (quadruples,currentQuadruple,functions,memory,global,logging=false)
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
            if(value.length !== null && value.length !== undefined)
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
        // case "READ":
        // {
        //     // check if types should work
        //     logger("PRINTED: ",value);
        //     rl.question(`Input value for ${quadruple.value}`, (answer) => {
        //         // TODO: Log the answer in a database
        //         logger(`Thank you for your valuable feedback: ${answer}`);
        //         // Todo check input is type of value
        //         assignValue(quadruple.value,answer);
        //         rl.close();
        //       });
        //     assignValue(quadruple.value,inputValue);
        // }
        //break;
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
    const value = getVariableValue(quadruple.value);
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
