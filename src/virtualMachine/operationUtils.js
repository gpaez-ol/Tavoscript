const { getVariableValue,assignVariableValue,loadFunction,resetMemory } = require("./memoryUtils");
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
let memoryStack = [];
let quadrupleStack = [];

export function solveOperation  (quadruple,currentQuadruple,functions,memory)
{
    if(quadruple === null || quadruple === undefined)
    {
        console.log("quadruple was not found");
        return undefined;
    }
    console.log("Current Quadruple: ",quadruple);
    switch (quadruple.operator){
        case "+":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand + rightOperand;
            console.log(`${leftOperand}+${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "-":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand - rightOperand;
            console.log(`${leftOperand}-${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "/":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand / rightOperand;
            console.log(`${leftOperand}/${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "*":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand * rightOperand;
            console.log(`${leftOperand}*${rightOperand}=${result}`);
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "=":
        {
            const [value,assignmentOperand] = getAssignmentOperands(quadruple);
            console.log(`${assignmentOperand}=${value}`);
            // yo se es 1008 pero deberia ser quadruple.operand el que tiene el valor de address
            assignVariableValue(assignmentOperand,value);
        }
        break;
        case "==":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand === rightOperand;
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "!=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand !== rightOperand;
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "<":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand < rightOperand;
            assignVariableValue(quadruple.result,result);
        }
        break;
        case ">":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand > rightOperand;
            assignVariableValue(quadruple.result,result);
        }
        break;
        case ">=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand >= rightOperand;
            assignVariableValue(quadruple.result,result);
        }
        break;
        case "<=":
        {
            const [leftOperand,rightOperand] = getOperationOperands(quadruple);
            const result = leftOperand <= rightOperand;
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

        }
        break;
        case "PARAM":
        {
            const value = getParamOperands(quadruple);
            parameterValues.push(value);
        }
        break;
        case "GOSUB":
        {
             // take screenshot
             memoryStack.push[{stackSegment:[...memory.stackSegment],extraSegment:[...memory.extraSegment]}]
             quadrupleStack.push(currentQuadruple);
             console.log("screenshot memory: ", memoryStack[memoryStack.length - 1]);
             console.log("left a breadcrum at: " ,quadrupleStack[quadrupleStack.length -1])
             loadFunction(functionCalled,parameterValues);
             parameterValues = [];
             return functionCalled.quadruplesStart;
        }
        break;
        case "ENDFUNC":
        {
            let lastQuadruple = quadrupleStack.pop();
            if(lastQuadruple === undefined || lastQuadruple === null)
            {
                console.log("The program ended");
                return null;
            }else {
                let lastMemory = memoryStack.pop();
                resetMemory(lastMemory);
                return lastQuadruple+1;
            }
        }
        break;
        case "RETURN":
        {
            // save global var with the function name as the value of return 
            let lastQuadruple = quadrupleStack.pop();
            if(lastQuadruple === undefined)
            {
                console.log("The program ended");
            }else {
                let lastMemory = memoryStack.pop();
                resetMemory(lastMemory);
                return lastQuadruple+1;
            }
        }
        break;
        case "GOTO":
        {
            const address = quadruple.address;
            return address;
        }
        break;
        case "GOTOF":
        {
            const address = quadruple.address;
            const value = getVariableValue(quadruple.value);
            if(!value)
            {
                return address;
            }
        }
        break;
        // case "READ":
        // {
        //     // check if types should work
        //     console.log("PRINTED: ",value);
        //     rl.question(`Input value for ${quadruple.value}`, (answer) => {
        //         // TODO: Log the answer in a database
        //         console.log(`Thank you for your valuable feedback: ${answer}`);
        //         // Todo check input is type of value
        //         assignValue(quadruple.value,answer);
        //         rl.close();
        //       });
        //     assignValue(quadruple.value,inputValue);
        // }
        //break;
        case "PRINT":
        {
            const value = getVariableValue(quadruple.value)
            console.log("PRINTED: ",value);
        }
        break;
    }
    return currentQuadruple+1;
}

function getOperationOperands(quadruple)
{
    let leftOperand = null;
    let rightOperand = null;
    if (quadruple.leftOperand >= 17000 && quadruple.leftOperand <= 20999)
    {  
        leftOperand = getVariableValue(getVariableValue(quadruple.leftOperand));
        console.log("Actual Left Operand:",leftOperand);    
    }else {
        leftOperand = getVariableValue(quadruple.leftOperand);
    }
    if (quadruple.rightOperand >= 17000 && quadruple.rightOperand <= 20999)
    {  
        rightOperand = getVariableValue(getVariableValue(quadruple.rightOperand));
        console.log("Actual Right Operand:",operationrightOperand);    
    }else {
        rightOperand = getVariableValue(quadruple.rightOperand);
    }
    if(leftOperand === null)
    {
        console.log("Left Operand is null");
        throw new Error("Left Operand is null")
    }
    if(rightOperand === null)
    {
        console.log("Right Operand is null");
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
        assignmentOperand = getVariableValue(quadruple.operand);
        console.log("Actual Assignment Operand:",assignmentOperand);    
    }
    return [value,assignmentOperand];
}
function getVerificationOperands(quadruple)
{
    const operand = getVariableValue(quadruple.operand);
    // check if upper limit should be a constant
    const upperLimit = quadruple.upperLimit //getVariableValue(quadruple.upperLimit);
    return [operand,upperLimit];
}
function getParamOperands(quadruple)
{
    const value = getVariableValue(quadruple.value);
    return value;
}