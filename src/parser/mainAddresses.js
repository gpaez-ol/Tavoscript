// TODO: Agregar codigos de tipos
/*
    int = 1
    float = 2
    string = 3
    bool =  4
    void = 5
    local = 6
    global = 7
    temporal = 8
    constant = 9
    pointer = 10
    parameter = 11
*/
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

const startingAddresses = {
     // variable global 1000-4999
    7: {
        1: 1000,
        2 :2000,
        3 : 3000,
        4: 4000,
    },
    // variable local 5000-8999
    6: {
        1 : 5000,
        2 : 6000,
        3 : 7000,
        4 : 8000,
    },
    // variable temporal 9000-12999
    8: {
        1 : 9000,
        2 : 10000,
        3 : 11000,
        4 : 12000,
    },
    // variable constantes 13000-16999
    9: {
        1 : 13000,
        2 : 14000,
        3 : 15000,
        4 : 16000,
    },
    // variable pointers de arreglos 17000-20999
    10 : {
        1 : 17000,
        2 : 18000,
        3 : 19000,
        4 : 20000,
    },
    // variable parameters 21000-23999
    11: {
        1: 21000,
        2: 22000,
        3: 23000,
        4: 24000
    }
}

function validateAddress(address,varType,type) {

    // Global Addreses: 1000-4999
    if(varType === 7 && address < 1000 )
    {
        console.log("Global Address is out of bounds");
        throw new Error("Global Address is out of bounds");
    }
    if(varType === 7 &&  address > 4999 )
    {
        console.log("Global Addresses limit has been reached");
        throw new Error("Global Addresses limit has been reached");
    }
    // variable local 5000-8999
    if(varType === 6 && address < 5000 )
    {
        console.log("Local Address is out of bounds");
        throw new Error("Local Address is out of bounds");
    }
    if(varType === 6 &&  address > 8999 )
    {
        console.log("Local Addresses limit has been reached");
        throw new Error("Local Addresses limit has been reached");
    }
    // variable temporal 9000-12999
    if(varType === 8 && address < 9000 )
    {
        console.log("Temporal Address is out of bounds");
        throw new Error("Temporal Address is out of bounds");
    }
    if(varType === 8 &&  address > 12999 )
    {
        console.log("Temporal Addresses limit has been reached");
        throw new Error("Temporal Addresses limit has been reached");
    }
    // variable constantes 13000-16999
    if(varType === 9 && address < 13000 )
    {
        console.log("Constant Address is out of bounds");
        throw new Error("Constant Address is out of bounds");
    }
    if(varType === 9 &&  address > 16999 )
    {
        console.log("Constant Addresses limit has been reached");
        throw new Error("Constant Addresses limit has been reached");
    }
    // variable pointers de arreglos 17000-20999
    if(varType === 10 && address < 17000 )
    {
        console.log("Array Pointer Address is out of bounds");
        throw new Error("Array Pointer Address is out of bounds");
    }
    if(varType === 10 &&  address > 20999 )
    {
        console.log("Array Pointer Addresses limit has been reached");
        throw new Error("Array Pointer Addresses limit has been reached");
    }

    // variable parameters 21000-23999
    if(varType === 11 && address < 21000 )
    {
        console.log("Array Pointer Address is out of bounds");
        throw new Error("Array Pointer Address is out of bounds");
    }
    if(varType === 11 &&  address > 23999 )
    {
        console.log("Array Pointer Addresses limit has been reached");
        throw new Error("Array Pointer Addresses limit has been reached");
    }
    
    // After passing the main address validations now we check the internal limits since we used numeric values this is simple
    if(type < 4)
    {
        if(address <  startingAddresses[varType][type])
        {
            console.log(`${getKey(type)} ( ${getKey(varType)} ) address is out of bounds`);
            throw new Error(`${getKey(type)} ( ${getKey(varType)} ) address is out of bounds`);
        }
        if(address >= startingAddresses[varType][type+1])
        {
            console.log(`${getKey(type)}  ( ${getKey(varType)} )  variables limit has been reached`);
            throw new Error(`${getKey(type)} ( ${getKey(varType)} ) variables limit has been reached`);
        }
    }

}

module.exports = {startingAddresses,typeMapper,validateAddress};