let semanticTable = {};
semanticTable["int"] = {
  "+": {
    int: "int",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "-": {
    int: "int",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "*": {
    int: "int",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "/": {
    int: "float",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  ">": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "<": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  ">=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "<=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "==": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "!=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
};

// Float values
semanticTable["float"] = {
  "+": {
    int: "float",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "-": {
    int: "float",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "*": {
    int: "float",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  "/": {
    int: "float",
    float: "float",
    string: undefined,
    bool: undefined,
  },
  ">": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "<": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  ">=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "<=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "==": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
  "!=": {
    int: "bool",
    float: "bool",
    string: undefined,
    bool: undefined,
  },
};
// string values
semanticTable["string"] = {
  "+": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "-": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "*": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "/": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  ">": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "<": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  ">=": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "<=": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "==": {
    int: undefined,
    float: undefined,
    string: "bool",
    bool: undefined,
  },
  "!=": {
    int: undefined,
    float: undefined,
    string: "bool",
    bool: undefined,
  },
};

// Boolean values
semanticTable["bool"] = {
  "+": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "-": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "*": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "/": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  ">": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "<": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  ">=": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "<=": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: undefined,
  },
  "&&": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: "bool",
  },
  "||": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: "bool",
  },
  "!": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: "bool",
  },
  "==": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: "bool",
  },
  "!=": {
    int: undefined,
    float: undefined,
    string: undefined,
    bool: "bool",
  },
};
export { semanticTable };
