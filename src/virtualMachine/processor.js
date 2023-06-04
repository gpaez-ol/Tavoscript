const { startVariablesMemory,memory } = require("./memoryUtils");
const { solveOperation} = require("./operationUtils");
async function startProgram({quadruples,functions},devMode)
{
    console.log("Starting Process ------------------------")
    startVariablesMemory(functions,devMode);
    let currentQuadruple = 0;
    let globalQuads = false;
    let globalQuadruples = quadruples.filter(quadruple => quadruple.global === true);
    if(devMode)
    {
        console.log("globalQuads",globalQuadruples);
    }
    if(globalQuadruples.length > 0)
    {
        globalQuads = true;
    }
    while(currentQuadruple !== undefined && currentQuadruple !== null)
    {
        let solvedOperation = await solveOperation(quadruples,currentQuadruple,functions,memory,globalQuads,devMode)

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
module.exports = {startProgram};