// TODO: Agregar codigos de tipos
/*
    int = 1
    float = 2
    string = 3
    bool =  4
*/
const typeMapper = new Map([
    ["int", 1],
    ["float", 2],
    ["string", 3],
    ["bool",4],
    ["void",5]
  ]);

const startingAddresses = {
     // variable global 1000-4999
    global: {
        1: 1000,
        2 :2000,
        3 : 3000,
        4: 4000,
    },
    // variable local 5000-8999
    local: {
        1 : 5000,
        2 : 6000,
        3 : 7000,
        4 : 8000,
    },
    // variable temporal 9000-12999
    temporal: {
        1 : 9000,
        2 : 10000,
        3 : 11000,
        4 : 12000,
    },
    // variable constantes 13000-15999
    constant: {
        1 : 13000,
        2 :14000,
        3 : 15000,
        4 : 16000,
    },
    // variable pointers de arreglos 17000-20999
    pointer: {
        1 : 17000,
        2 :18000,
        3 : 19000,
        4 : 20000,
    },
    // variable parameters 21000-23999
    parameter: {
        1: 21000,
        2: 22000,
        3: 23000,
        4: 24000
    }
}

module.exports = {startingAddresses,typeMapper};