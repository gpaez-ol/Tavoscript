let semanticTable = {};
semanticTable[1] = {
  "+": {
    1: 1,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "-": {
    1: 1,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "*": {
    1: 1,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "/": {
    1: 2,
    2: 2,
    3: undefined,
    4: undefined,
  },
  ">": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "<": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  ">=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "<=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "==": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "!=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
};

// Float values
semanticTable[2] = {
  "+": {
    1: 2,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "-": {
    1: 2,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "*": {
    1: 2,
    2: 2,
    3: undefined,
    4: undefined,
  },
  "/": {
    1: 2,
    2: 2,
    3: undefined,
    4: undefined,
  },
  ">": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "<": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  ">=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "<=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "==": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
  "!=": {
    1: 4,
    2: 4,
    3: undefined,
    4: undefined,
  },
};
// string values
semanticTable[3] = {
  "+": {
    1: undefined,
    2: undefined,
    3: "string",
    4: undefined,
  },
  "-": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "*": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "/": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  ">": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "<": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  ">=": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "<=": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "==": {
    1: undefined,
    2: undefined,
    3: 4,
    4: undefined,
  },
  "!=": {
    1: undefined,
    2: undefined,
    3: 4,
    4: undefined,
  },
};

// Boolean values
semanticTable[4] = {
  "+": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "-": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "*": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "/": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  ">": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "<": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  ">=": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "<=": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  },
  "&&": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: 4,
  },
  "||": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: 4,
  },
  "==": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: 4,
  },
  "!=": {
    1: undefined,
    2: undefined,
    3: undefined,
    4: 4,
  },
};
module.exports = {semanticTable};
