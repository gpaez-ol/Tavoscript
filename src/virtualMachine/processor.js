const { startVariablesMemory,memory } = require("./memoryUtils");
const { solveOperation} = require("./operationUtils");
export function startProgram({quadruples,functions})
{
    console.log("Starting Process ------------------------")
    startVariablesMemory(functions);
    let currentQuadruple = 0;
    let globalQuads = false;
    let globalQuadruples = quadruples.filter(quadruple => quadruple.global === true);
    console.log("globalQuads",globalQuadruples);
    if(globalQuadruples.length > 0)
    {
        globalQuads = true;
        console.log("Hay globales")
    }
    while(currentQuadruple !== undefined && currentQuadruple !== null)
    {
        let solvedOperation = solveOperation(quadruples,currentQuadruple,functions,memory,globalQuads,false)

        if(solvedOperation.currentQuadruple === undefined && globalQuads === true)
        {
            globalQuads = false;
            currentQuadruple=0;
            console.log("Global Quads finished")
        }else if(solvedOperation.currentQuadruple !== undefined)
        {
            currentQuadruple = solvedOperation.currentQuadruple;
            globalQuads = solvedOperation.global
        }
    }
}