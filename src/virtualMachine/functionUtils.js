function getFunctionQuadruples(startingQuadruple,quadruples)
{
    let lastFunctionQuadruple = startingQuadruple;
    let currentQuadruple = quadruples.find(quadruple => quadruple.id === lastFunctionQuadruple);
    while(currentQuadruple !== null && currentQuadruple !== undefined && currentQuadruple.operator !== "ENDFUNC")
    {
        lastFunctionQuadruple++;
        currentQuadruple = quadruples.find(quadruple => quadruple.id === lastFunctionQuadruple);
    }
    if (currentQuadruple === null || currentQuadruple === undefined)
    {
        console.log("Function does not have an endfunc");
        throw new Error("Function does not have an endfunc");
    }
    let functionQuadruples = quadruples.slice(startingQuadruple,lastFunctionQuadruple+1);
    
    return functionQuadruples;
}
module.exports = {getFunctionQuadruples};