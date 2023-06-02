// TODO: Agregar codigos de tipos
/*
    int = 1
    float = 2
    string = 3
    bool =  4
*/
const startingAddresses = {
     // variable global 1000-4999
    global: {
        int: 1000,
        float :2000,
        string : 3000,
        bool: 4000,
    },
    // variable local 5000-8999
    local: {
        int : 5000,
        float : 6000,
        string : 7000,
        bool : 8000,
    },
    // variable temporal 9000-12999
    temporal: {
        int : 9000,
        float : 10000,
        string : 11000,
        bool : 12000,
    },
    // variable constantes 13000-15999
    constant: {
        int : 13000,
        float :14000,
        string : 15000,
        bool : 16000,
    },
    // variable pointers de arreglos 17000-20999
    pointer: {
        int : 17000,
        float :18000,
        string : 19000,
        bool : 20000,
    },
    // variable parameters 21000-23999
    parameter: {
        int: 21000,
        float: 22000,
        string: 23000,
        bool: 24000
    }
}

module.exports = {startingAddresses};