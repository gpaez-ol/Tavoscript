// Arquitectura von newmann
// 4 segmentos
/*
DS
CS
SS
ES
*/
// variables global se encuentra aqui y funciones
// variable global 1000-4999
// dataSegment = [];
// segmento de codigo (quadruplos de la funcion)
// codeSegment = [];
// las variables locales / parametros (todos los scopes que no son globales) estos se mueren al terminar una funcion
// variables local 5000-8999
// variables parameter 21000-23999
// stackSegment = [];
// for files etc, pointers o espacio extra (en este caso los registros temporales) igual se mueren al terminar una funcion
// constantes "PRINT() LETRERO"
// variable temporal 9000-12999
// variable constantes 13000-15999
// variable pointers de arreglos 17000-20999
// extraSegment = [];

export let memory = {dataSegment:{},codeSegment:{},stackSegment:{},extraSegment:{}};

function createSegment(variables,segment)
{
    variables.map(variable => {
        if(variable.dimensions !== null && variable.dimensions !== undefined)
        {
            let m0 = variable.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1)
            while(m0 >= 0)
            {
                segment[Number(variable.address)+m0]=null
                m0--;
            }
        }else {
            segment[variable.address]=null
        }

        });
        console.log(segment);
}
function createConstantSegment(variables,segment)
{
    variables.forEach(variable => {
            segment[variable.address] = variable.name
        });
}
function createParameterSegment(variables,parameterValues,segment)
{
    console.log(parameterValues);

    variables.forEach(variable => 
        {
            segment[variable.address] = parameterValues.shift()
            console.log("paramer with value:",segment[variable.address])
        })
}

// add pointer vars
export function startVariablesMemory(functions){
    let globalVars = functions[0].variables.filter(variable => variable.varType === "global");
    createSegment(globalVars,memory.dataSegment);
    let extraSegmentVars = functions[0].variables.filter(variable => variable.varType === "temporal" || variable.varType === "pointer");
    createSegment(extraSegmentVars,memory.extraSegment);
    let constantVars = functions[0].variables.filter(variable => variable.varType === "constant");
    createConstantSegment(constantVars,memory.dataSegment);
    console.log("data segment",memory.dataSegment)
    console.log("stack segment", memory.stackSegment);
    console.log("extra segment:",memory.extraSegment);
}



export function loadFunction(currentFunc,parameterValues=[])
{
    let localVars = currentFunc.variables.filter(variable => variable.varType === "local");
    createSegment(localVars,memory.stackSegment);
    let parameterVars = currentFunc.variables.filter(variable => variable.varType === "parameter");
    createParameterSegment(parameterVars,parameterValues,memory.stackSegment)
    let temporalVars = currentFunc.variables.filter(variable => variable.varType === "temporal" || variable.varType === "pointer");
    createSegment(temporalVars,memory.extraSegment);
}

export function resetMemory({stackSegment,extraSegment})
{
    memory.stackSegment = stackSegment;
    memory.extraSegment = extraSegment;
}

export function offloadFunction(currentFunc)
{
    memory.extraSegment = {};
    memory.stackSegment = {};
}

export function getVariableValue(address)
{
    // variable global int 1000-4999
    if( address <= 1999 && address >= 1000)
    {   
        return memory.dataSegment[address] !== null ?  Number(memory.dataSegment[address]) : null;
    }
    // variable global float 2000-2999
    if( address <= 2999 && address >= 2000)
    {
        return memory.dataSegment[address] !== null ?  Number(memory.dataSegment[address]) : null;
    }
    // variable global string 3000-3999
    if( address <= 3999 && address >= 3000)
    {
        return memory.dataSegment[address] !== null ? String(memory.dataSegment[address]) : null;
    }
    // variable global bool 4000-4999
    if( address <= 4999 && address >= 4000)
    {
        return memory.dataSegment[address] !== null ? Boolean(memory.dataSegment[address]) : null;
    }
    // local int 5000-5999
    if( address <= 5999 && address >= 5000)
    {
        return memory.stackSegment[address] !== null ?  Number(memory.stackSegment[address]) : null;
    }
    // local float 6000-6999
    if( address <= 6999 && address >= 6000)
    {
        return memory.stackSegment[address] !== null ?  Number(memory.stackSegment[address]) : null;
    }
    // local string 7000-7999
    if( address <= 7999 && address >= 7000)
    {
        return memory.stackSegment[address] !== null ?  String(memory.stackSegment[address]) : null;
    }
    // local bool 8000-8999
    if( address <= 8999 && address >= 8000)
    {
        return memory.stackSegment[address] !== null ?  Boolean(memory.stackSegment[address]) : null;
    }
    // temporal int  9000-9999
    if( address <= 9999 && address >= 9000)
    {
        return memory.extraSegment[address] !== null ?  Number(memory.extraSegment[address]) : null;
    }
    // temporal float  10000-10999
    if( address <= 10999 && address >= 10000)
    {
        return memory.extraSegment[address] !== null ?  Number(memory.extraSegment[address]) : null;
    }
    // temporal string  11000-11999
    if( address <= 11999 && address >= 11000)
    {
        return memory.extraSegment[address] !== null ?  String(memory.extraSegment[address]) : null;
    }
    // temporal bool  12000-12999
    if( address <= 12999 && address >= 12000)
    {
        return memory.extraSegment[address] !== null ?  Boolean(memory.extraSegment[address]) : null;
    }
    // constant int 13000 - 13999
    if( address <= 13999 && address >= 13000)
    {
        return memory.dataSegment[address] !== null ?  Number(memory.dataSegment[address]) : null;
    }
    // constant float 14000 - 14999
    if( address <= 14999 && address >= 14000)
    {
        return memory.dataSegment[address] !== null ?  Number(memory.dataSegment[address]) : null;
    }
    // constant string 15000 - 15999
    if( address <= 15999 && address >= 15000)
    {
        return memory.dataSegment[address] !== null ?  String(memory.dataSegment[address]) : null;
    }
    // constant bool 16000 - 16999
    if( address <= 16999 && address >= 16000)
    {
        return memory.dataSegment[address] !== null ?  Boolean(memory.dataSegment[address]) : null;
    }
    // pointer int 17000 - 17999
    if( address <= 17999 && address >= 17000)
    {   
        return memory.extraSegment[address] !== null ?  Number(memory.extraSegment[address]) : null;
    }
    // pointer float 18000 - 18999
    if( address <= 18999 && address >= 18000)
    {
        return memory.extraSegment[address] !== null ?  Number(memory.extraSegment[address]) : null;
    }
    // pointer string 19000 - 19999
    if( address <= 19999 && address >= 19000)
    {
        return memory.extraSegment[address] !== null ?  String(memory.extraSegment[address]) : null;
    }
    // pointer bool 20000 - 20999
    if( address <= 20999 && address >= 20000)
    {
        return memory.extraSegment[address] !== null ?  Boolean(memory.extraSegment[address]) : null;
    }
    // parameter int 21000 - 21999
    if( address <= 21999 && address >= 21000)
    {
        return memory.stackSegment[address] !== null ?  Number(memory.stackSegment[address]) : null;
    }
    // parameter float 22000 - 22999
    if( address <= 22999 && address >= 22000)
    {
        return memory.stackSegment[address] !== null ?  Number(memory.stackSegment[address]) : null;
    }
    // parameter string 23000 - 23999
    if( address <= 23999 && address >= 23000)
    {
        return memory.stackSegment[address] !== null ?  String(memory.stackSegment[address]) : null;
    }
    // parameter bool 24000 - 24999
    if( address <= 24999 && address >= 24000)
    {
        return memory.stackSegment[address] !== null ?  Boolean(memory.stackSegment[address]) : null;
    }
    throw new Error("Address is not found in the stacks");
}

export function assignVariableValue(address,value)
{
    if( address <= 4999 && address >= 1000)
    {
        memory.dataSegment[address] = value;
        return;
    }
    if ((address <= 8999 && address >= 5000)  || (address <= 23999 && address >= 21000) )
    {
        memory.stackSegment[address] = value;
        return;
    }
    if (address <= 20999 && address >=9000)
    {
        memory.extraSegment[address] = value;
        return;
    }
    throw new Error("Address is not found in the stacks");
}

