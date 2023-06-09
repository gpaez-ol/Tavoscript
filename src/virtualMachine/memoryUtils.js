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
// variable temporal 9000-12999
// variable constantes 13000-16999
// variable pointers de arreglos 17000-20999
// extraSegment = [];

let memory = {dataSegment:{},codeSegment:[],stackSegment:{},extraSegment:{}};

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
}
function createConstantSegment(variables,segment)
{
    variables.forEach(variable => {
            segment[variable.address] = variable.name
        });
}
function createParameterSegment(variables,parameterValues,segment)
{
    
    variables.forEach(variable => 
        {
            if(variable.dimensions !== null && variable.dimensions !== undefined)
            {
                let m0 = variable.dimensions.reduce((currentValue,currentDimension) => { return currentValue * Number(currentDimension.upperLimit)},1)
                let x = 0;
                while(x < m0){
                    segment[variable.address+x]  = parameterValues.shift();
                    x++;
                }
            }else {
                segment[variable.address] = parameterValues.shift()

            }
        })
}


 function startVariablesMemory(functions,globalQuadruples,devMode){
    // Global Var Type = 7
    let globalVars = functions[0].variables.filter(variable => variable.varType === 7);
    createSegment(globalVars,memory.dataSegment);
    // Temporal Var Type = 8 // Pointer Var Type = 10
    let extraSegmentVars = functions[0].variables.filter(variable => variable.varType === 8 || variable.varType === 10);
    createSegment(extraSegmentVars,memory.extraSegment);
    // Constant Var Type = 9
    let constantVars = functions[0].variables.filter(variable => variable.varType === 9);
    createConstantSegment(constantVars,memory.dataSegment);
    memory.codeSegment = globalQuadruples;
    if(devMode)
    {
        console.log("data segment",memory.dataSegment)
        console.log("stack segment", memory.stackSegment);
        console.log("extra segment:",memory.extraSegment);
        console.log("code segment:",memory.codeSegment);
    }
}



 function loadFunction(currentFunc,parameterValues=[],quadruples)
{
    let localVars = currentFunc.variables.filter(variable => variable.varType === 6);
    createSegment(localVars,memory.stackSegment);
    // Parameter Var Type = 11
    let parameterVars = currentFunc.variables.filter(variable => variable.varType === 11);
    createParameterSegment(parameterVars,parameterValues,memory.stackSegment)
    // Temporal Values = 8 // Pointer Var Type = 10
    let temporalVars = currentFunc.variables.filter(variable => variable.varType === 8 || variable.varType === 10);
    createSegment(temporalVars,memory.extraSegment);
    memory.codeSegment = quadruples;
}

 function resetMemory({stackSegment,extraSegment,codeSegment})
{
    memory.stackSegment = stackSegment;
    memory.extraSegment = extraSegment;
    memory.codeSegment = codeSegment;
}


var booleanRegexPattern = new RegExp("true");

 function getVariableValue(address)
{
    // variable global int 1000-1999
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
        return memory.dataSegment[address] !== null ? booleanRegexPattern.test(memory.dataSegment[address]) : null;
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
        return memory.stackSegment[address] !== null ?  booleanRegexPattern.test(memory.stackSegment[address]) : null;
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
        return memory.extraSegment[address] !== null ? booleanRegexPattern.test(memory.extraSegment[address]) : null;
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
        return memory.dataSegment[address] !== null ? booleanRegexPattern.test(memory.dataSegment[address]): null;
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
        return memory.extraSegment[address] !== null ? booleanRegexPattern.test(memory.extraSegment[address]): null;
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
        return memory.stackSegment[address] !== null ?  booleanRegexPattern.test(memory.stackSegment[address]): null;
    }
    throw new Error("Address is not found in the stacks");
}
 function getArrayVariableValues(address,arraySize) {
    let x = 0;
    let values = [];
    while(x < arraySize)
    {
        let value = getVariableValue(address+x);
        values.push(isNaN(value) ?null:value);
        x++;
    }
    return values;
}

 function assignVariableValue(address,value)
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

function getCodeSegmentIndex(id)
{
    let arrayIndex = memory.codeSegment.findIndex( quadruple => {
        return  quadruple.id === id;
      });
    if(arrayIndex === null || arrayIndex === undefined)
    {
        console.log(`${address} was not found in the loaded function`);
        throw new Error(`${address} was not found in the loaded function`);
    }
    return arrayIndex;
}

const typeMapper = new Map([
    ["int", 1],
    ["float", 2],
    ["string", 3],
    ["bool",4],
    ["void",5],
    ["local",6],
    ["global",7],
    ["temporal",8],
    ["constant",9],
    ["pointer",10],
    ["parameter",11]
  ]);

  function getKey(value) {
    return [...typeMapper].find(([key, val]) => val == value)[0]
  }

module.exports = {memory,getKey,startVariablesMemory,getCodeSegmentIndex,loadFunction,resetMemory,getVariableValue,getArrayVariableValues,assignVariableValue};