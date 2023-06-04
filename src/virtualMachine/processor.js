const { startVariablesMemory,loadFunction,memory } = require("./memoryUtils");
const { solveOperation} = require("./operationUtils");
const {getFunctionQuadruples} = require("./functionUtils");
async function startProgram({quadruples,functions},devMode)
{
    console.log("Starting Process ------------------------")
    let currentQuadruple = 0;
    let globalQuads = false;
    let globalQuadruples = quadruples.filter(quadruple => quadruple.global === true);
    startVariablesMemory(functions,globalQuadruples,devMode);
    if(devMode)
    {
        console.log("globalQuads",globalQuadruples);
    }
    if(globalQuadruples.length > 0)
    {
        globalQuads = true;
    }else {
        let mainFunctionQuadruples = getFunctionQuadruples(functions[1].quadruplesStart,quadruples);
        loadFunction(functions[1],[],mainFunctionQuadruples);
    }
    while(currentQuadruple !== undefined && currentQuadruple !== null)
    {
        let solvedOperation = await solveOperation(quadruples,currentQuadruple,functions,memory,globalQuads,devMode)

        if(solvedOperation.currentQuadruple === undefined && globalQuads === true)
        {
            globalQuads = false;
            currentQuadruple=0;
            console.log("Global Quads finished")
            let mainFunctionQuadruples = getFunctionQuadruples(functions[1].quadruplesStart,quadruples);
            loadFunction(functions[1],[],mainFunctionQuadruples);
        }else if(solvedOperation.currentQuadruple !== undefined)
        {
            currentQuadruple = solvedOperation.currentQuadruple;
            globalQuads = solvedOperation.global
        }
    }
}
module.exports = {startProgram};