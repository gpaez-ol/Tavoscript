const { startVariablesMemory,memory } = require("./memoryUtils");
const { solveOperation} = require("./operationUtils");
export function startProgram({quadruples,functions})
{
    console.log("Starting Process for the first time");
    startVariablesMemory(functions);
    let currentQuadruple = 0;
    while(currentQuadruple !== undefined && currentQuadruple !== null)
    {
        currentQuadruple = solveOperation(quadruples[currentQuadruple],currentQuadruple,functions,memory)
    }
}